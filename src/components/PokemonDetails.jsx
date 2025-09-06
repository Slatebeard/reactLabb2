import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

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
  }, [id]); // Added dependency array with id

  return (
    <div className="pokemon-details">
      {pokemon ? ( // Check if pokemon exists to avoid errors
        <>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <Link to="/">Back to List</Link>
        </>
      ) : (
        <p>Loading...</p> // Display while fetching
      )}
    </div>
  );
};

export default PokemonDetails;
