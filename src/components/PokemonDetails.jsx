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
    <>
      <h2 className="details-title">-- Details --</h2>
      <div className="pokemon-details">
        {pokemon ? (
          <>
            <h2 className="pokemon-name">{makeCapitalized(pokemon.name)}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="navigation-links">
        <Link to="/favorites" className="favorite-link">
          Back to Favorites
        </Link>
        <Link to="/" className="home-link">
          Back to List
        </Link>
      </div>
    </>
  );
};

export default PokemonDetails;
