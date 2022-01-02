const Genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 878, name: "Science Fiction" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];
const apiURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&&api_key=04c35731a5ee918f014970082a0088b1&query=";
const pagination = "&page=";
let page = 1;
let searchPage = 1;
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const moviesContainer = document.querySelector(".movies-container");
const loading = document.querySelector(".loading");
const input = document.querySelector(".search");
const searchIcon = document.querySelector(".search-icon");
const searchContainer = document.querySelector(".search-container");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const movieCatalog = document.querySelector(".movie-catalog");

window.addEventListener("load", () => {
  loading.classList.add("loading-off");
});

const getMovies = (url, page) => {
  fetch(url + pagination + page)
    .then((resp) => resp.json())
    .then((data) => {
      data.results.map((movie) => {
        let movieList = document.createElement("div");
        movieList.classList.add("movieList");
        movieList.innerHTML = `
      <img src="${IMGPATH + movie.poster_path}" 
      alt="${movie.title}" width="100%"/>
      <div class="movie-title">
      <h2>${movie.title}</h2>
      <span class="vote ${colorByRate(movie.vote_average)}">${
          movie.vote_average
        }</span>
      </div>
      `;
        moviesContainer.append(movieList);
        //   console.log(movie);
      });
      console.log(data);
    });
};

getMovies(apiURL, page);

searchContainer.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputValue = input.value;
  let searchValue = SEARCHAPI + inputValue + pagination;
  if (!inputValue) {
    return;
  }
  moviesContainer.innerHTML = "";
  console.log(inputValue);
  getMovies(searchValue, searchPage);
  input.addEventListener("click", () => {
    input.value = "";
    searchPage = 1;
  });
  prevBtn.addEventListener("click", () => {
    if (searchPage > 1) {
      searchPage--;
      moviesContainer.innerHTML = "";
      getMovies(searchValue, searchPage);
    }
  });
  nextBtn.addEventListener("click", () => {
    if (searchPage < 500) {
      searchPage++;
      moviesContainer.innerHTML = "";
      getMovies(searchValue, searchPage);
    }
  });
});
searchIcon.addEventListener("click", (e) => {
  e.preventDefault();
  let inputValue = input.value;
  let searchValue = SEARCHAPI + inputValue + pagination;
  if (!inputValue) {
    return;
  }
  moviesContainer.innerHTML = "";
  console.log(inputValue);
  getMovies(searchValue, searchPage);
  input.addEventListener("click", () => {
    input.value = "";
    searchPage = 1;
  });
  prevBtn.addEventListener("click", () => {
    if (searchPage > 1) {
      searchPage--;
      moviesContainer.innerHTML = "";
      getMovies(searchValue, searchPage);
    }
  });
  nextBtn.addEventListener("click", () => {
    if (searchPage < 500) {
      searchPage++;
      moviesContainer.innerHTML = "";
      getMovies(searchValue, searchPage);
    }
  });
});

function colorByRate(rate) {
  if (rate >= 8) {
    return "green";
  } else if (rate >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

prevBtn.addEventListener("click", () => {
  if (!input.value && page > 1) {
    page--;
    moviesContainer.innerHTML = "";
    getMovies(apiURL, page);
  }
});
nextBtn.addEventListener("click", () => {
  if (!input.value && page < 500) {
    page++;
    moviesContainer.innerHTML = "";
    getMovies(apiURL, page);
  }
});

let currentGenreID = [];
Genres.map((genre) => {
  let genreElement = document.createElement("h2");
  genreElement.classList.add("genreElement");
  genreElement.innerHTML = genre.name;
  genreElement.id = genre.id;

  genreElement.addEventListener("click", () => {
    if (!currentGenreID.length) {
      currentGenreID.push(genre.id);
    } else {
      if (currentGenreID.includes(genre.id)) {
        currentGenreID.forEach((id, idx) => {
          if (id == genre.id) {
            currentGenreID.splice(idx, 1);
          }
        });
      } else {
        currentGenreID.push(genre.id);
      }
    }
    genreElement.classList.toggle("genreElement-toggle");
    console.log(currentGenreID);
    moviesContainer.innerHTML = "";
    page = 1;
    getMovies(
      apiURL + "&with_genres=" + encodeURI(currentGenreID.join(",")) + pagination
    );
  });
  movieCatalog.append(genreElement);
});
