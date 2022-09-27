const poke_container = document.getElementById('poke-container');
const pokemon_count = 150;
const btnValue = document.querySelectorAll('.btn__categoria');
const section2 = document.querySelector('.section2');
const section4 = document.querySelector('.section4');
const ventanaFlotante = document.querySelector('.ventana__flotante');
const btnNav = document.querySelector('.btn_menu');
const cerrarMenu = document.querySelector('.cerrar_menu');
const activarMenu = document.querySelector('.buttom');
let categoryBtn = '';
const colors = {
  fire: '#fddfdf',
  grass: '#defde0',
  electric: '#fcf7de',
  water: '#def3fd',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eeeda1',
  flying: '#f5f5f5',
  fighting: '#e6e0d4',
  normal: '#f5f5f5',
};

const main_type = Object.keys(colors);

const fechPokemons = async () => {
  limpiarHTMl();
  for (let i = 1; i <= pokemon_count; i++) {
    await getpokemon(i);
  }
};

const getpokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  createpokemonCart(data);
};
const createpokemonCart = (pokemon) => {
  /*  console.log(pokemon); */
  const { name } = pokemon;
  const id = pokemon.id.toString().padStart(3, '0');

  const valorEstadisticas = pokemon.stats.map((stats) => stats.base_stat);

  const poke_type = pokemon.types.map((type) => type.type.name);
  const type = main_type.find((type) => poke_type.indexOf(type) > -1);

  const pokemonEl = document.createElement('div');
  pokemonEl.classList.add('pokemon', type);
  const color = colors[type];
  pokemonEl.style.backgroundColor = color;
  const pokemonHTMl = `
  <div class="img-container">
       <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png" alt="">
  </div>
  <div class="info">
      <span class="number">${id}</span>
      <h3 class="name">${name}</h3>
      <small class="type">type: <span class="type-pokemon" >${type}</span></small>
  </div>
  <div class="info2">
  <h3>experiencia: <span class="exp"> ${pokemon.base_experience}</span></h3>
  <h3>hp <span class="hp">: ${valorEstadisticas[0]}</span></h3>
  <h3>ataque: <span class="atack"> : ${valorEstadisticas[1]}</span></h3>
  <h3>defensa: <span class="dfs">: ${valorEstadisticas[2]}</span></h3>
  <h3>ataque especial: <span class="es_atack">: ${valorEstadisticas[3]}</span></h3>
  <h3>velocidad: <span class="speed">: ${valorEstadisticas[5]}</span></h3>

            </div>
  <button class="btn_ver">Ver</button>
  <button class="btn_ver_movil">VER</button>
  `;

  pokemonEl.innerHTML = pokemonHTMl;
  poke_container.appendChild(pokemonEl);
};

const infoPokemonSelect = () => {
  const listaPokemon = document.querySelector('.poke-container');
  listaPokemon.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('btn_ver')) {
      const pokemonSeleccionado = e.target.parentElement;
      leerlainfoPokemon(pokemonSeleccionado);
    } else if (e.target.classList.contains('btn_ver_movil')) {
      const pokemonSeleccionado = e.target.parentElement;
      ventanaFlotante.classList.remove('hiden');
      leerlainfoPokemon(pokemonSeleccionado);
    }
  });
};

const leerlainfoPokemon = (pokemonSeleccionado) => {
  /* console.log(pokemonSeleccionado); */
  //objeto con los datos del pokemon
  const datosPokemon = {
    imagen: pokemonSeleccionado.querySelector('.img-container img').src,
    nombre: pokemonSeleccionado.querySelector('.info .name').textContent,
    type: pokemonSeleccionado.querySelector('.info .type-pokemon').textContent,
    id: pokemonSeleccionado.querySelector('.info .number').textContent,
    hp: pokemonSeleccionado.querySelector('.info2 .hp').textContent,
    experiencia: pokemonSeleccionado.querySelector('.info2 .exp').textContent,
    atque: pokemonSeleccionado.querySelector('.info2 .atack').textContent,
    defence: pokemonSeleccionado.querySelector('.info2 .dfs').textContent,
    especial_atque:
      pokemonSeleccionado.querySelector('.info2 .es_atack').textContent,
    velocidad: pokemonSeleccionado.querySelector('.info2 .speed').textContent,
  };

  const pokemonSection2HTML = `
  <div class="info_section2">
      <h3>${datosPokemon.nombre}</h3>
      <p>type: ${datosPokemon.type}</p>
  </div>
  <div class="img-section2">
      <img src="${datosPokemon.imagen}" alt="">
  </div>
    `;

  const {
    imagen,
    nombre,
    type,
    id,
    hp,
    experiencia,
    atque,
    defence,
    especial_atque,
    velocidad,
  } = datosPokemon;

  const pokeStadistic = `
    <div class="img_seccion4">
       <img src="${imagen}" alt="">
    </div>
    <div class="datos_seccion4">
        <h3>nombre: <span>${nombre}</span></h3>
        <h3>id: <span> ${id}</span></h3>
        <h3>experiencia: <span> ${experiencia}</span></h3>
        <h3>hp: <span> ${hp}</span></h3>
        <h3>ataque: <span> ${atque}</span></h3>
        <h3>defensa: <span> ${defence}</span></h3>
        <h3>ataque: especial <span>:${especial_atque}</span></h3>
        <h3>velocidad: <span> ${velocidad}</span></h3>
    </div>
    `;

  const ventanaFlotante_info = `
  <div class="info__ventana">
  <div class="img_ventanaF">
    <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png" alt="">
  </div>
  <div class="dato_ventanaF">
  <p class="cerrar">cerrar</p>
  <h3>nombre: <span>${nombre}</span></h3>
  <h3>id: <span> ${id}</span></h3>
  <h3>experiencia: <span> ${experiencia}</span></h3>
  <h3>hp: <span> ${hp}</span></h3>
  <h3>ataque: <span> ${atque}</span></h3>
  <h3>defensa: <span> ${defence}</span></h3>
  <h3>ataque especial: <span>${especial_atque}</span></h3>
  <h3>velocidad: <span> ${velocidad}</span></h3>
  </div>

 </div>
  `;
  ventanaFlotante.innerHTML = ventanaFlotante_info;
  section2.innerHTML = pokemonSection2HTML;
  section4.innerHTML = pokeStadistic;
};

const buscadorPokemon = document.querySelector('.buscar__pokemon');
buscadorPokemon.addEventListener('keyup', (e) => {
  if (e.target.value) {
    const element_poke = document.querySelectorAll('.info h3');
    element_poke.forEach((elementP) => {
      if (
        elementP.textContent
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      ) {
        elementP.parentElement.parentElement.classList.remove('hiden');
      } else {
        elementP.parentElement.parentElement.classList.add('hiden');
      }
    });
  }
});

ventanaFlotante.addEventListener('click', (e) => {
  if (e.target.classList.contains('cerrar')) {
    ventanaFlotante.classList.add('hiden');
  }
});

btnNav.addEventListener('click', () => {
  activarMenu.classList.add('active_menu');
});

cerrarMenu.addEventListener('click', () => {
  activarMenu.classList.remove('active_menu');
});

/*=================== FILTRADO CON LOS BOTONES ===============*/

btnValue.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    categoryBtn = e.target.textContent;
    if (activarMenu.classList.contains('active_menu')) {
      activarMenu.classList.remove('active_menu');
    }
    filtrarCategoriaP(categoryBtn);
  });
});
const filtrarCategoriaP = (button) => {
  const btnCategoria = document.querySelectorAll('.btn__categoria');
  btnCategoria.forEach((btn) => {
    if (button.toUpperCase() == btn.innerText.toUpperCase()) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  let elementsCard = document.querySelectorAll('.pokemon');
  elementsCard.forEach((element) => {
    const typePokemon = document.querySelectorAll('.type-pokemon');
    /* console.log(element); */
    if (button === 'todos') {
      element.classList.remove('hiden');
    } else {
      if (element.classList.contains(button)) {
        element.classList.remove('hiden');
      } else {
        element.classList.add('hiden');
      }
    }
  });
};

const limpiarHTMl = () => {
  while (poke_container.firstChild) {
    poke_container.removeChild(poke_container.firstChild);
  }
};

fechPokemons();
infoPokemonSelect();
