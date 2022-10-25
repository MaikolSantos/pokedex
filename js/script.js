let pokeId = 0;

function opnendPokedex() {
  setTimeout(async () => {
    const randon = Math.floor(Math.random() * 905);
    const pokemon = await searchPokemon(randon);
    renderPokemon(pokemon);
    pokeId = randon;
  }, 500);
}
opnendPokedex();

async function searchPokemon(pokemon) {
  const baseURL = "https://pokeapi.co/api/v2/pokemon/";

  const img = document.querySelector("img");
  img.src = "/img/loading.svg";

  if (pokemon <= 0) {
    const request = await fetch(baseURL + 1);
    const response = await request.json();
    return response;
  } else if (pokemon > 905) {
    const request = await fetch(baseURL + 905);
    const response = await request.json();
    return response;
  } else {
    const request = await fetch(baseURL + pokemon);

    if(request.ok) {
      const response = await request.json();
      return response;
    } else {
      const img = document.querySelector("img");
      img.src = "/img/not.svg";
    }
  }
}

function renderPokemon(pokemon) {
  setTimeout(() => {
    const img = document.querySelector("img");
    img.src =
      pokemon.sprites.other.dream_world.front_default ||
      pokemon.sprites.other["official-artwork"].front_default;
  }, 50);

  const figcaption = document.querySelector("figcaption");
  figcaption.innerText = "#" + pokemon.id;

  const pokeName = document.querySelector(".pokedex__display > p");
  pokeName.innerText = pokemon.name;

  pokeId = pokemon.id;
}

const input = document.querySelector("input");
input.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    const value = input.value;

    input.setAttribute("disabled", "");

    const pokemon = await searchPokemon(value);

    input.removeAttribute("disabled");

    renderPokemon(pokemon);
  }
});

const nextPokemon = document.querySelector(".pokebuttons .right");

nextPokemon.addEventListener("click", async () => {
  pokeId += 1;
  const pokemon = await searchPokemon(pokeId);
  renderPokemon(pokemon);
});

const previousPokemon = document.querySelector(".pokebuttons .left");

previousPokemon.addEventListener("click", async () => {
  pokeId -= 1;
  const pokemon = await searchPokemon(pokeId);
  renderPokemon(pokemon);
});

const randomButtons = [...document.querySelectorAll(".page-button")];

randomButtons.forEach((button) => {
  button.addEventListener("click", () => {
    opnendPokedex();
  });
});

const pokebola = document.querySelector(".pokebola");

pokebola.addEventListener("click", () => {
  const pokedex = document.querySelector(".pokedex");
  if (pokedex.classList.contains("opened")) {
    pokedex.classList.toggle("closed");
    setTimeout(() => {
      pokedex.classList.remove("opened");
      pokedex.classList.remove("closed");

    }, 1000)
  } else {
    pokedex.classList.toggle("opened");
  }
  input.value = ''
});
