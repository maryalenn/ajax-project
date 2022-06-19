// Variables
var baseURL = 'https://v2.jokeapi.dev';
var xhr = new XMLHttpRequest();
// var categories = ['Misc', 'Coding', 'Spooky', 'Dark', 'Pun', 'Christmas'];
var params = [
  'blacklistFlags=nsfw,religious,racist'
];
// buttons
var btnNewJoke = document.getElementById('btnNewJoke');
// var btnChooseCategory = document.getElementById('btnChooseCategory');
// var btnCatMisc = document.getElementById('cat-misc');
// var btnCatPuns = document.getElementById('cat-puns');
// var btnCatCoding = document.getElementById('cat-coding');
// var btnCatDark = document.getElementById('cat-dark');
// var btnCatSpooky = document.getElementById('cat-spooky');
// var btnCatChristmas = document.getElementById('cat-christmas');
// divs
var $overlay = document.querySelector('.overlay');
var $divCurrentJoke = document.getElementById('current-joke');
var $divJokeSetup = document.querySelector('.setup');
var $divJokeDelivery = document.querySelector('.delivery');
// content
var jokeSetup = '';
var jokeDelivery = '';

// DOM Creation
function init() {
  var $divJoke = document.createElement('div');
  var $divJokeSetup = document.createElement('div');
  var $divJokeDelivery = document.createElement('div');

  $divCurrentJoke.appendChild($divJoke);
  $divJoke.setAttribute('class', 'joke');
  $divJoke.setAttribute('id', 'feature-joke');
  $divJoke.appendChild($divJokeSetup);
  $divJokeSetup.setAttribute('class', 'setup');
  $divJokeSetup.innerText = jokeSetup;
  $divJokeDelivery.setAttribute('class', 'delivery');
  $divJoke.appendChild($divJokeDelivery);
  $divJokeDelivery.innerText = jokeDelivery;
  updateJoke();
}
init();

// API Request
function getJokes(category) {
  var cat = 'Any';
  if (!category) { cat = 'Any'; } else { cat = category; }
  xhr.open('GET', baseURL + '/joke/' + cat + '?' + params.join('&'));

  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // console.log('xhr.status', xhr.status);
    // console.log('xhr.response', xhr.response);

    if (xhr.response.type === 'twopart') {
      jokeSetup = xhr.response.setup;
      jokeDelivery = xhr.response.delivery;
      $divJokeSetup.innerText = jokeSetup;
      $divJokeDelivery.innerText = jokeDelivery;

    } else {
      jokeSetup = xhr.response.joke;
      jokeDelivery = '';
      $divJokeSetup.innerText = jokeSetup;
      $divJokeDelivery.innerText = jokeDelivery;
    }
  });
  xhr.send();
}

// Button Event Listeners
btnNewJoke.addEventListener('click', () => {
  updateJoke();
});
// btnChooseCategory.addEventListener('click', () => {
//   updateJoke();
//   $overlay.classList.remove('hidden');
// });
// // Category Buttons
// btnCatMisc.addEventListener('click', () => {
//   getJokes('Misc');
//   updateJoke();
// });
// btnCatPuns.addEventListener('click', () => {
//   getJokes('Pun');
//   updateJoke();
// });
// btnCatCoding.addEventListener('click', () => {
//   getJokes('Coding');
//   updateJoke();
// });
// btnCatDark.addEventListener('click', () => {
//   getJokes('Dark');
//   updateJoke();
// });
// btnCatSpooky.addEventListener('click', () => {
//   getJokes('Spooky');
//   updateJoke();
// });
// btnCatChristmas.addEventListener('click', () => {
//   getJokes('Christmas');
//   updateJoke();
// });

// Functions
function updateJoke() {
  getJokes();
  $divJokeSetup = document.querySelector('div#feature-joke div.setup');
  $divJokeDelivery = document.querySelector('div#feature-joke div.delivery');
  $divJokeSetup.innerHTML = jokeSetup;
  $divJokeDelivery.innerHTML = jokeDelivery;
  $overlay.classList.add('hidden');
}
