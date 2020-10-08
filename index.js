var box = document.getElementById("box");
var search = document.getElementsByClassName("search_icon")[0];
var input = document.getElementsByClassName("search_input")[0];
var modal = document.getElementById("myModal");
var modalContent = document.getElementsByClassName("modal-content")[0];
var span = document.getElementsByClassName("close")[0];

function searchMovie(e) {
  e.preventDefault();
  var inputValue = input.value;
  fetchData(`http://www.omdbapi.com/?s=${inputValue}&apikey=${APIKEY}`);
}

const fetchData = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) =>
      data.Search.forEach((element) => {
        console.log(element.imdbID);
        box.innerHTML += `<li class="media list-media">
        <img class="align-self-center mr-3 image" src="${element.Poster}" alt="Generic placeholder image">
        <div class="media-body">
          <h5 class="mt-0">${element.Title}</h5>
          <p>${element.Year}</p>
          <a href="#" class="btn btn-info btn-lg active" role="button" onclick="fetchDataModal('${element.imdbID}')" aria-pressed="true">Read More</a>
        </div>
      </li>`;
      })
    )
    .catch((error) => console.error("error:", error));
};

const fetchDataModal = (imdbID) => {
  console.log(imdbID);
  fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=${APIKEY}`)
    .then((response) => response.json())
    .then((data) => {
      modalContent.innerHTML = `<li class="media modal-media">
        <img class="align-self-center mr-3 modal-image" src="${data.Poster}" alt="Generic placeholder image">
        <div class="media-body">
          <h5 class="mt-0">${data.Title}</h5>
          <p>${data.Year}</p>
          <p>${data.Plot}</p>
          <a href="https://www.imdb.com/title/${imdbID}/" class="btn btn-primary btn-lg" style="background-color: #f3ce13; color: black; border: none;" role="button" aria-pressed="true"><b>IMDB</b></a>

        </div>
      </li>`;
      modal.style.display = "block";
    })
    .catch((error) => console.error(`error: ${error}`));
};

search.addEventListener("click", searchMovie);

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
