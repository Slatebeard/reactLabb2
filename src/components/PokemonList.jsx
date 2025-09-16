import React, { useState, useEffect } from "react";
import { Link } from "react-router";

import useFavorites from "../hooks/useFavorites.js";
import { fetchPokemonSprites } from "../hooks/fetchPokemonSprites.js";

import makeCapitalized from "../utils/makeCapitalized.js";

import "../css/PokemonList.css";

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?offset=151?limit=20"
      );
      const data = await response.json();
      const pokemonWithSprites = await fetchPokemonSprites(data.results);
      setPokemon(pokemonWithSprites);
    };
    fetchPokemon();
  }, []);

  return (
    <div className="pokemonList">
      <h2>Pokémon List</h2>
      <ul>
        {pokemon.map((mon) => {
          const id = mon.url.split("/").slice(-2, -1)[0];
          return (
            <li key={id}>
              <Link to={`/item/${id}`}>
                {mon.sprite && <img src={mon.sprite} alt={mon.name} />}
                {makeCapitalized(mon.name)}
              </Link>
              <button onClick={() => toggleFavorite(id)}>
                {favorites.includes(id) ? "Remove" : "Favorite"}
              </button>
            </li>
          );
        })}
      </ul>
      <Link to="/favorites">Show favorites</Link>
    </div>
  );
};

export default PokemonList;
