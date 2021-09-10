"use strict";
const searchUser = document.querySelector(".js-input-search");
const searchButton = document.querySelector(".js-button");
const favoritesShows = document.querySelector(".js-favorites-shows");
const listShowContainer = document.querySelector(".js-list-show-container");
let showList = [];
let showFavorites = [];
function handleButtonSearch(ev) {
  ev.preventDefault();
  let user = searchUser.value;
  fetch(`//api.tvmaze.com/search/shows?q=${user}`)
    .then((response) => response.json())
    .then((data) => {
      showList = data;
      console.log(data);
      render();
    });
}

function render() {
  let html = "";
  for (const list of showList) {
    console.log(list);
    console.log(list.show.name);
    html += `<li class= "js-container-film" id= "${list.show.id}">`;
    html += `<h3 class="js-film-name">${list.show.name}</h3>`;
    if (list.show.image === null) {
      html += `<img class= "js-film-image" src= "https://via.placeholder.com/210x295/ffffff/666666/?text=TV">`;
    } else {
      html += `<img class = "js-film-image" src= "${list.show.image.original}"></li>`;
    }
  }
  listShowContainer.innerHTML = html;
  handleListenerLi();
}

function handleListenerLi() {
  const allLi = document.querySelectorAll(".js-container-film");

  for (const eachLi of allLi) {
    eachLi.addEventListener("click", handleFavoriteShow);
  }
}

function handleFavoriteShow(ev) {
  console.log("Hola");

  const selectedShow = parseInt(ev.currentTarget.id);

  const objetClicked = showList.find((allLi) => {
    return allLi.show.id === selectedShow;
  });
  showFavorites.push(objetClicked);
  let htmlForfavorites = "";
  console.log(showFavorites);
  for (const eachShowFavorite of showFavorites) {
    /* htmlForfavorites += `<li class= "js-favorite-film">${eachShowFavorite.show.name}</li>`;*/
    htmlForfavorites += `<li class= "js-container-film" id= "${eachShowFavorite.show.id}">`;
    htmlForfavorites += `<h3 class="js-film-name js-film-name-favorite">${eachShowFavorite.show.name}</h3>`;
    if (eachShowFavorite.show.image === null) {
      htmlForfavorites += `<img class= "js-film-image" src= "https://via.placeholder.com/210x295/ffffff/666666/?text=TV">`;
    } else {
      htmlForfavorites += `<img class = "js-film-image js-favourite-shows " src= "${eachShowFavorite.show.image.original}"></li>`;
    }
  }
  favoritesShows.innerHTML = htmlForfavorites;
}

searchButton.addEventListener("click", handleButtonSearch);
