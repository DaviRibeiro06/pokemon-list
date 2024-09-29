let data;
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Função para obter os pokémons
async function getPokemons(url) {
    const resp = await fetch(url);
    data = await resp.json();
    renderPokemons(data.results);
}

// Renderiza os pokémons no HTML
function renderPokemons(pokemons) {
    const pokemonList = document.getElementById('pokemonList');
    pokemonList.innerHTML = '';

    pokemons.forEach(pokemon => {
        const pokemonId = pokemon.url.split('/')[pokemon.url.split('/').length - 2];
        const isFavorite = favorites.includes(pokemon.name);

        const pokemonCard = `
            <div class="pokemonCard col-md-3">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png" alt="${pokemon.name}">
                <h5>${pokemon.name}</h5>
                <button class="favorite-btn ${isFavorite ? 'active' : ''}" onclick="toggleFavorite('${pokemon.name}')">
                    &#9733;
                </button>
            </div>
        `;
        pokemonList.innerHTML += pokemonCard;
    });
}

// Função para alternar favoritos
function toggleFavorite(name) {
    const index = favorites.indexOf(name);
    if (index === -1) {
        favorites.push(name);
    } else {
        favorites.splice(index, 1);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderPokemons(data.results);
}

// Função para busca de pokémons
document.getElementById('searchPokemon').addEventListener('input', function () {
    const query = this.value.toLowerCase();
    const filteredPokemons = data.results.filter(pokemon => pokemon.name.includes(query));
    renderPokemons(filteredPokemons);
});

// Navegação
document.getElementById('btnNext').onclick = () => getPokemons(data.next);
document.getElementById('btnPrevious').onclick = () => getPokemons(data.previous);

// Inicializa a página
getPokemons('https://pokeapi.co/api/v2/pokemon');
