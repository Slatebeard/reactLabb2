import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFavorites from "../hooks/useFavorites.js";

const Favorites = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (favorites.length === 0) {
        setPokemon([]);
        setLoading(false);
        return;
      }
      const promises = favorites.map((id) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
          res.json()
        )
      );
      const data = await Promise.all(promises);
      setPokemon(data);
      setLoading(false);
    };
    fetchFavorites();
  }, [favorites]);

  return (
    <div className="favorites">
      <h2>Mina Favoriter</h2>
      <ul>
        {pokemon.map((poke) => (
          <li key={poke.id}>
            <Link to={`/item/${poke.id}`}>{poke.name}</Link>
            <button onClick={() => toggleFavorite(poke.id.toString())}>
              Toggle
            </button>
          </li>
        ))}
      </ul>
      <Link to="/">Back to list</Link>
    </div>
  );
};

export default Favorites;
