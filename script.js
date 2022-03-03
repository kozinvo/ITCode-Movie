const TOKEN = 'd0ad0982-c3ff-4c1e-974f-3ba9d0a75f08';

let searchBtn = document.querySelector('.header__btn');
searchBtn.addEventListener('click', () => {
  getData();
});

document.querySelector(".header__input")
  .addEventListener("keyup", function (e) {
    e.preventDefault();
    if (e.keyCode === 13) {
      searchBtn.click();
    }
  });

function getData() {
  const input = document.querySelector('.header__input');
  if (+input.value > 1900 && +input.value < 2023) {
    fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films?order=RATING&yearFrom=${input.value}&yearTo=${input.value}`, {
        method: 'GET',
        headers: {
          'X-API-KEY': TOKEN,
          'Content-Type': 'application/json',
        },
      })
      .then(res => res.json())
      .then(data => updateUI(data))
      .catch(err => console.log(err));
  } else {
    alert('Введите корректный год!');
  }
}

function updateUI(data) {
  let filmWrapper = document.getElementById('films');

  filmWrapper.innerHTML = '';
  data.items.forEach(item => {
    let div = document.createElement('div');
    div.classList.add('film__item');
    div.innerHTML = `
    <h2 class="film__title">${item.nameRu}</h2>
    <img src='${item.posterUrl}' class="film__img" alt="${item.nameRu}">
    <span class="film__genre">Жанр: ${item.genres.map((genre) => ` ${genre.genre} `)}</span>
    <p class="film__rating">Рейтинг Кинопоиска: ${item.ratingKinopoisk}</p>
    `;
    filmWrapper.append(div);
  });

}