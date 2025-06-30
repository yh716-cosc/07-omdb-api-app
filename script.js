// Get references to the search form and the results grid in the HTML
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('movie-search'); // <-- updated
const resultsGrid = document.getElementById('movie-results'); // <-- updated

// This function fetches movies from the OMDb API using the search term
async function fetchMovies(searchTerm) {
  // Replace 'YOUR_API_KEY' with your actual OMDb API key
  const apiKey = '58df57ee';
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchTerm)}`;

  // Fetch data from the OMDb API
  const response = await fetch(url);
  const data = await response.json();

  // Return the array of movies, or an empty array if none found
  return data.Search || [];
}

// This function displays movies in the results grid
function displayMovies(movies) {
  // Clear any previous results
  resultsGrid.innerHTML = '';

  // Loop through each movie and create a card for it
  movies.forEach(movie => {
    // Create a div for the movie card
    const card = document.createElement('div');
    card.className = 'movie-card';

    // Set the inner HTML of the card using template literals
    card.innerHTML = `
      <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="Poster for ${movie.Title}">
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
    `;

    // Add the card to the results grid
    resultsGrid.appendChild(card);
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