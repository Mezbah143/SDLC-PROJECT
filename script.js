document.addEventListener('DOMContentLoaded', () => {
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeContents = document.querySelectorAll('.swipe-content');
    const loginIcon = document.querySelector('.login-icon');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.querySelector('.close-modal');

    // Swipe functionality
    document.querySelector('.content-container').addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.querySelector('.content-container').addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const currentActive = document.querySelector('.swipe-content.active');
        const currentIndex = Array.from(swipeContents).indexOf(currentActive);

        if (touchEndX < touchStartX) {
            // Swipe Left
            const nextIndex = (currentIndex + 1) % swipeContents.length;
            switchContent(nextIndex);
        } else if (touchEndX > touchStartX) {
            // Swipe Right
            const prevIndex = (currentIndex - 1 + swipeContents.length) % swipeContents.length;
            switchContent(prevIndex);
        }
    }

    function switchContent(index) {
        swipeContents.forEach(content => content.classList.remove('active'));
        swipeContents[index].classList.add('active');
    }

    // Navigation Click Handling
    document.querySelectorAll('.main-nav ul li').forEach((navItem, index) => {
        navItem.addEventListener('click', () => {
            switchContent(index);
        });
    });

    // Login Modal Handling
    loginIcon.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    // Login Form Submission
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add login logic here
        alert('Login functionality to be implemented');
    });







    // API Options
    // Define API Keys and Base URLs
        const apiConfig = {
            fixtures: {
                url: "https://v3.football.api-sports.io/fixtures",
                headers: { "x-rapidapi-key": "YOUR_API_KEY_1" }
            },
            leagues: {
                url: "https://api.football-data.org/v4/competitions",
                headers: { "X-Auth-Token": "YOUR_API_KEY_2" }
            },
            teams: {
                url: "https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=",
                headers: {}
            },
            news: {
                url: "https://newsapi.org/v2/everything?q=football&apiKey=YOUR_API_KEY_3",
                headers: {}
            },
            analysis: {
                url: "https://example-analysis-api.com/matches",
                headers: { "Authorization": "Bearer YOUR_API_KEY_4" }
            }
        };

        // Fetch Data from API
        async function fetchData(endpoint, headers = {}) {
            try {
                const response = await fetch(endpoint, { headers });
                if (!response.ok) throw new Error(`Error: ${response.statusText}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error(error);
                alert("Failed to fetch data.");
                return null;
            }
        }

        // Handlers for Navigation Links
        async function loadFixtures() {
            const data = await fetchData(apiConfig.fixtures.url, apiConfig.fixtures.headers);
            displayData("Fixtures", data);
        }

        async function loadLeagues() {
            const data = await fetchData(apiConfig.leagues.url, apiConfig.leagues.headers);
            displayData("Leagues", data);
        }

        async function loadTeams() {
            const teamName = "Arsenal"; // Example team, replace dynamically
            const data = await fetchData(`${apiConfig.teams.url}${teamName}`, apiConfig.teams.headers);
            displayData("Teams", data);
        }

        async function loadNews() {
            const data = await fetchData(apiConfig.news.url, apiConfig.news.headers);
            displayData("News", data);
        }

        async function loadAnalysis() {
            const data = await fetchData(apiConfig.analysis.url, apiConfig.analysis.headers);
            displayData("Analysis", data);
        }

        // Display Data in a Section
        function displayData(sectionName, data) {
            const displaySection = document.getElementById("display");
            displaySection.innerHTML = `<h2>${sectionName}</h2><pre>${JSON.stringify(data, null, 2)}</pre>`;
        };