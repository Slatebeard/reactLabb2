import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useFavorites from "../hooks/useFavorites.js";
import { fetchPokemonSprites } from "../hooks/fetchPokemonSprites.js";

import makeCapitalized from "../utils/makeCapitalized.js";

const Favorites = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (favorites.length === 0) {
        setPokemon([]);
        setLoading(false);
        return;
      }

      const pokemonList = favorites.map((id) => ({
        url: `https://pokeapi.co/api/v2/pokemon/${id}/`,
      }));

      const pokemonWithSprites = await fetchPokemonSprites(pokemonList);
      setPokemon(
        pokemonWithSprites.map((mon, index) => ({
          id: favorites[index],
          name: mon.name,
          sprite: mon.sprite,
        }))
      );
      setLoading(false);
    };
    fetchFavorites();
  }, [favorites]);

  return (
    <div className="favorites">
      <h2>My Favorites</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {pokemon.map((mon) => (
            <li key={mon.id}>
              <Link to={`/item/${mon.id}`}>
                {mon.sprite && <img src={mon.sprite} alt={mon.name} />}
                {mon.name}
              </Link>
              <button onClick={() => toggleFavorite(mon.id.toString())}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <Link to="/">Back to list</Link>
    </div>
  );
};

export default Favorites;
