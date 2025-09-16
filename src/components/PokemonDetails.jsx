import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import makeCapitalized from "../utils/makeCapitalized";

import "../css/PokemonDetails.css";

const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      setPokemon(data);
    };
    fetchPokemon();
  }, [id]);

  return (
    <div className="pokemon-details">
      {pokemon ? (
        <>
          <h2 className="pokemon-name">{makeCapitalized(pokemon.name)}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <Link to="/favorites">Back to favorites</Link>
          <br />
          <Link to="/">Back to List</Link>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PokemonDetails;
