// Recupera os favoritos do localStorage
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Função para exibir os favoritos na página
function renderFavorites() {
    const favoritesList = document.getElementById('favoritesList');
    favoritesList.innerHTML = '';

    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p class="text-center">Você ainda não tem Pokémons favoritos.</p>';
        return;
    }

    favorites.forEach(async (pokemonName) => {
        // Faz uma requisição à PokeAPI para pegar os dados do Pokémon favorito pelo nome
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const pokemon = await response.json();
        const pokemonId = pokemon.id;

        // Cria o card do Pokémon favorito
        const pokemonCard = `
            <div class="pokemonCard col-md-3">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png" alt="${pokemon.name}">
                <h5>${pokemon.name}</h5>
            </div>
        `;
        favoritesList.innerHTML += pokemonCard;
    });
}

// Inicializa exibindo os favoritos
renderFavorites();
