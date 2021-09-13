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
    html += `<li class= "js-container-film " id= "${list.show.id}">`;
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
  console.log("HOLAAAA");
  console.log(ev.currentTarget.id);

  const allShows = event.currentTarget;
  allShows.classList.toggle("js-favorite");

  const selectedShow = parseInt(ev.currentTarget.id);

  const objetClicked = showList.find((allLi) => {
    return allLi.show.id === selectedShow;
  });
  console.log(objetClicked);

  const favoriteFound = showFavorites.findIndex((fav) => {
    return fav.show.id === selectedShow;
  });
  console.log(favoriteFound);
  if (favoriteFound === -1) {
    showFavorites.push(objetClicked);
  } else {
    showFavorites.splice(favoriteFound, 1);
  }

  let htmlForfavorites = "";
  console.log(showFavorites);
  for (const eachShowFavorite of showFavorites) {
    htmlForfavorites += `<li class= "js-favourite-shows" id= "${eachShowFavorite.show.id}">`;

    if (eachShowFavorite.show.image === null) {
      htmlForfavorites += `<img class= "js-film-image js-favourite-shows" src= "https://via.placeholder.com/210x295/ffffff/666666/?text=TV">`;
    } else {
      htmlForfavorites += `<img class = "js-film-image js-favourite-shows " src= "${eachShowFavorite.show.image.original}">`;

      htmlForfavorites += `<h4 class="js-film-name js-film-name-favorite js-favourite-shows">${eachShowFavorite.show.name}</h4></li>`;
    }
  }
  favoritesShows.innerHTML = htmlForfavorites;
}

searchButton.addEventListener("click", handleButtonSearch);

// Añadimos la informacion al local storage
function setInLocalStorage() {
  // stringify me permite transformar a string el array de palettes
  const stringShowList = JSON.stringify(showList);
  //añadimos  al localStorage  los datos convertidos en string previamente
  localStorage.setItem("showListData", stringShowList);
}
//esta funcion me permite  gacer una peticion  al servidor
function getFromApi() {
  fetch("//api.tvmaze.com/search/shows?q=")
    .then((response) => response.json())
    .then((data) => {
      showList = data.showList;
      // pintamos los datos que nos  da la API
      setInLocalStorage();
      // los datos que me ha dado la API  los guardamos en el loscalStorage
    });
}

// esta funcion  nos permite buscar en el localStorage si hay informacion guardada
// para no hacer peticion al servidor cada vez que cargue la pagina
function getLocalStorage() {
  // obtenermos lo que hay en el LS
  const localStorageShowList = localStorage.getItem("showListData");
  // siempre que cojo datos del local storage tengo que comprobar si son válidos
  // es decir si es la primera vez que entro en la página
  if (localStorageShowList === null) {
    // no tengo datos en el local storage, así que llamo al API
    getFromApi();
  } else {
    // sí tengo datos en el local storage, así lo parseo a un array y
    const arrayShowList = JSON.parse(localStorageShowList);
    // lo guardo en la variable global de palettes
    showList = arrayShowList;
    // cada vez que modifico los arrays de palettes o de favorites vuelvo a pintar y a escuchar eventos
  }
}
// 1- start app -- Cuando carga la pagina
getLocalStorage();
