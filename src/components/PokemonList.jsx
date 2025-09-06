import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=20"
      );
      const data = await response.json();
      setPokemon(data.results);
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
              <Link to={`/item/${id}`}>{mon.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PokemonList;
