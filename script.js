const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox');

// Function to fetch movie details using OMDb API
const getMovieInfo = async (movie) => {
    const myAPIkey = "f8da61c6";
    const url = `https://www.omdbapi.com/?apikey=${myAPIkey}&t=${movie}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.Response === "False") {
            throw new Error(data.Error);
        }

        const showMovieData = (data) => {
            movieContainer.innerHTML = "";

            // Ensure Title is properly parsed
            const title = data.Title || "Unknown Title";

            const { imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;

            const movieElement = document.createElement('div');
            movieElement.classList.add('movie-info');
            movieElement.innerHTML = `
                <h2>${title}</h2>
                <p><strong>Rating: ⭐</strong> ${imdbRating}</p>
            `;

            const movieGenreElement = document.createElement('div');
            movieGenreElement.classList.add('movie-genre');
            Genre.split(",").forEach(element => {
                const p = document.createElement('p');
                p.innerText = element.trim();
                movieGenreElement.appendChild(p);
            });

            movieElement.appendChild(movieGenreElement);

            movieElement.innerHTML += `
                <p><strong>Released:</strong> ${Released}</p>
                <p><strong>Duration:</strong> ${Runtime}</p>
                <p><strong>Cast:</strong> ${Actors}</p>
                <p><strong>Plot:</strong> ${Plot}</p>
            `;

            const moviePosterElement = document.createElement('div');
            moviePosterElement.classList.add('movie-poster');
            moviePosterElement.innerHTML = `<img src="${Poster}" alt="${title} poster"/>`;

            movieContainer.appendChild(moviePosterElement);
            movieContainer.appendChild(movieElement);
        };

        showMovieData(data);
    } catch (error) {
        movieContainer.innerHTML = `<p class='error'>Error: ${error.message}</p>`;
        console.error("Error fetching movie data:", error);
    }
};

// Event listener for search form
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if (movieName !== '') {
        getMovieInfo(movieName);
    }
});
