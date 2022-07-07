const pokeForm = document.querySelector(".poke-form");
// targeting the input form and submit
const pokeList = document.querySelector(".poke-list");
// targeting the pokemon ul list

let state = {
  pokemons: [],
}; //local state of data i get remotely

const setCurrentState = (pokemons) => {
  state.pokemons = pokemons;
}; // adding and deleting pokemons that then update state

const renderCurrentState = () => {
  pokemonsUl.innerHTML = "";

  state.pokemons.forEach((todo) => {
    const todoLi = document.createElement("li");
    pokemonsUl.append(todoLi);

    if (todo.completed) {
      todoLi.setAttribute("class", "completed");
    }

    todoLi.innerText = todo.title;
  });
};

const get = () => {
  fetch("http://localhost:3000/pokemons")
    .then(function (Response) {
      console.log("the response", Response);
      return Response.json();
    })
    .then(function (pokemons) {
      console.log("the data", pokemons);
      setCurrentState(pokemons);
      renderCurrentState();
    });
};

get();

function addPokemon(pokemon) {
  const liEl = document.createElement("li");
  //creates the pokemon card li
  const imgEl = document.createElement("img");
  // creates the card img
  const h2El = document.createElement("h2");
  // creates the pokemon card title

  liEl.classList.add("pokemon");
  //creates a class
  imgEl.src = pokemon.image;

  h2El.innerText = pokemon.name;
  //sets the inner text of h2 to the pokemons name

  liEl.append(imgEl, h2El);
  //appends the image and title of the pokemon to the li
  pokeList.append(liEl);
  // appends the li to the ul
}

function addPokemons(pokemons) {
  pokemons.forEach((pokemon) => addPokemon(pokemon));
  //for each loop that adds all pokemons from the data
}

function listenToAddPokemonForm() {
  pokeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const pokemon = {
      name: pokeForm.name.value,
      image: pokeForm.image.value,
    };

    // CREATE
    // fetch("http://localhost:3000/pokemons", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(pokemon)
    // })
    //   .then(res =>  res.json())
    //   .then(pokemon => addPokemon(pokemon));
    //   });

    pokeForm.reset();
  });
}

function init() {
  listenToAddPokemonForm();

  // READ
  fetch("http://localhost:3000/pokemons")
    .then((res) => res.json())
    .then((pokemons) => addPokemons(pokemons));
}

init();
