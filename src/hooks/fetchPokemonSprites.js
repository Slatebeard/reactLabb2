export const fetchPokemonSprites = async (pokemonList) => {
    const pokemonWithSprites = await Promise.all(
        pokemonList.map(async (mon) => {
            const id = mon.url.split("/").slice(-2, -1)[0];
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await response.json();
            return {
                ...mon,
                sprite: data.sprites.front_default
            };
        })
    );
    return pokemonWithSprites;
};
