function getElement(selector, parent = document) {
  return parent.querySelector(selector);
}

let pokemonCards = [
  {
    id: 1,
    title: "test",
    img: "./images/pokemon.png",
    categories: ["grass", "poison"],
    weight: "8.9kg",
    age: 5,
    isFavorite: true,
  },
  {
    id: 2,
    title: "Pokemons",

    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_FWF2judaujT30K9sMf-tZFhMWpgP6xCemw&s",

    categories: ["grass", "poison", "nimadir"],
    weight: "6.9kg",
    age: 99,
    isFavorite: true,
  },
  {
    id: 3,
    title: "Pokemons",

    img: "./images/pokemon.png",

    categories: ["grass", "poison"],
    weight: "6.9kg",
    age: 199,
    isFavorite: false,
  },
  {
    id: 4,
    title: "Pokemons",

    img: "./images/pokemon.png",

    categories: ["grass", "poison"],
    weight: "6.9kg",
    age: 19,
    isFavorite: false,
  },
  {
    id: 5,
    title: "Pokemons",

    img: "./images/pokemon.png",

    categories: ["grass", "poison"],
    weight: "6.9kg",
    age: 99,
    isFavorite: false,
  },
  {
    id: 6,
    title: "Pokemons",

    img: "./images/pokemon.png",

    categories: ["grass", "poison"],
    weight: "6.9kg",
    age: 4,
    isFavorite: false,
  },
  {
    id: 7,
    title: "Pokemons",

    img: "./images/pokemon.png",

    categories: ["grass", "poison"],
    weight: "6.9kg",
    age: 99,
    isFavorite: false,
  },
  {
    id: 8,
    title: "Pokemons",

    img: "./images/pokemon.png",

    categories: ["grass", "poison", "test"],
    weight: "6.9kg",
    age: 99,
    isFavorite: false,
  },
];

const categories = ["gross", "poison", "nimadir", "test"];
const sectionEl = document.querySelector(".row");

const btns = document.querySelectorAll(".btn");
const template = document.querySelector("template");

const elCategories = getElement("#categories-list");
const elSearchInput = getElement("#search");
const elSubmitBtn = getElement("#submit-btn");
const elOrderSelect = getElement("#order-select");

elOrderSelect.addEventListener("change", () => {
  if (elOrderSelect.value === "age") {
    const sortedArray = pokemonCards.sort((a, b) => a.age - b.age);

    displayPokemonCard(sortedArray);
  }
});

elSubmitBtn.addEventListener("click", () => {
  if (elSearchInput.value.length > 0) {
    const filteredArray = pokemonCards.filter((item) =>
      item.title.toLowerCase().includes(elSearchInput.value.toLowerCase())
    );

    displayPokemonCard(filteredArray);
  } else {
    displayPokemonCard(pokemonCards);
  }
});

window.addEventListener("DOMContentLoaded", function () {
  displayPokemonCard(pokemonCards);

  categories.forEach((category) => {
    const newOption = document.createElement("option");
    newOption.value = category;
    newOption.textContent = category;

    elCategories.appendChild(newOption);
  });
});

elCategories.addEventListener("change", () => {
  const filteredArray = pokemonCards.filter((item) =>
    item.categories.includes(elCategories.value)
  );

  displayPokemonCard(filteredArray);
});

function displayPokemonCard(menuItems) {
  sectionEl.textContent = null;

  let displayPokemonCard = menuItems.map((item) => {
    const newElement = template.content.cloneNode(true);

    const topImg = getElement(".card-img-top", newElement);
    const title = getElement(".card-title", newElement);
    const weight = getElement(".card-weight", newElement);
    const age = getElement(".card-age", newElement);
    const categories = getElement(".categories", newElement);
    const likeBtn = getElement(".card-like", newElement);

    likeBtn.dataset.id = item.id;
    if (item.isFavorite) {
      likeBtn.src = "./images/favorite.png";
    }

    topImg.src = item.img;
    title.textContent = item.title;
    weight.textContent = item.weight;
    age.textContent = item.age;

    item.categories.map((category, i) => {
      const newLi = document.createElement("li");
      const span = document.createElement("span");

      if (item.categories.length - 1 !== i) {
        span.textContent = ", ";
      }

      newLi.textContent = category;

      categories.appendChild(newLi);
      categories.appendChild(span);
    });

    sectionEl.appendChild(newElement);
  });
}

sectionEl.addEventListener("click", (evt) => {
  if (evt.target.className === "card-like") {
    const id = Number(evt.target.dataset.id);

    for (let i = 0; i < pokemonCards.length; i++) {
      if (pokemonCards[i].id === id) {
        pokemonCards[i].isFavorite = !pokemonCards[i].isFavorite;
      }
    }
    console.log(pokemonCards);
    displayPokemonCard(pokemonCards);
  }
});
