// Get references to the search form and the results grid in the HTML
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('movie-search');
const resultsGrid = document.getElementById('movie-results');
const watchlistContainer = document.getElementById('watchlist');

// Use an array to store watchlist movies
let watchlist = [];

// This function fetches movies from the OMDb API using the search term
async function fetchMovies(searchTerm) {
  // Replace 'YOUR_API_KEY' with your actual OMDb API key
  const apiKey = '58df57ee';
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchTerm)}`;

  // Fetch data from the OMDb API
  const response = await fetch(url);
  const data = await response.json();
  console.log(url);
  // Return the array of movies, or an empty array if none found
  return data.Search || [];
}

// This function displays movies in the results grid
function displayMovies(movies) {
  // Clear any previous results
  resultsGrid.innerHTML = '';

  // If no movies are found, show a message
  if (movies.length === 0) {
    resultsGrid.innerHTML = '<p>No movies found. Try another search!</p>';
    return;
  }

  // Loop through each movie and create a card for it
  movies.forEach(movie => {
    // Create a div for the movie card
    const card = document.createElement('div');
    card.className = 'movie-card';
    // Center align everything in the card
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.alignItems = 'center';
    card.style.justifyContent = 'center';

    // Set the inner HTML of the card using template literals
    card.innerHTML = `
      <img 
        src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" 
        alt="Poster for ${movie.Title}"
        style="width: 150px; height: 225px; object-fit: cover; margin-bottom: 10px;"
      >
      <h3 style="text-align: center;">${movie.Title}</h3>
      <p style="text-align: center;">${movie.Year}</p>
      <button id="add-watchlist-btn" class="btn">Add to Watchlist</button>
    `;

    // Add event listener for the "Add to Watchlist" button
    const addBtn = card.querySelector('#add-watchlist-btn');
    addBtn.addEventListener('click', function() {
      addToWatchlist(movie);
    });

    // Add the card to the results grid
    resultsGrid.appendChild(card);
  });
}

// This function adds a movie to the watchlist if it's not already there
function addToWatchlist(movie) {
  // Check if the movie is already in the watchlist by imdbID
  const exists = watchlist.some(item => item.imdbID === movie.imdbID);

  // Only add if not already in the watchlist
  if (!exists) {
    watchlist.push(movie);
    displayWatchlist();
  }
}

// This function displays the watchlist
function displayWatchlist() {
  // Clear the watchlist container
  watchlistContainer.innerHTML = '';

  // If the watchlist is empty, show a message
  if (watchlist.length === 0) {
    watchlistContainer.textContent = 'Your watchlist is empty. Search for movies to add!';
    return;
  }

  // Loop through each movie in the watchlist and create a card
  watchlist.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'movie-card';

    // Restrict poster size in the watchlist as well
    card.innerHTML = `
      <img 
        src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" 
        alt="Poster for ${movie.Title}"
        style="width: 150px; height: 225px; object-fit: cover;"
      >
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
    `;

    watchlistContainer.appendChild(card);
  });
}

// Listen for the search form submission
searchForm.addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent the page from reloading

  // Get the search term from the input
  const searchTerm = searchInput.value.trim();

  // Only search if the input is not empty
  if (searchTerm) {
    // Fetch movies from the API
    const movies = await fetchMovies(searchTerm);

    // Display the movies in the grid
    displayMovies(movies);
  }
});

// Show the watchlist on page load
displayWatchlist();