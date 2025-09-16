import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useFavorites from "../hooks/useFavorites.js";
import makeCapitalized from "../utils/makeCapitalized.js";

// import "../css/PokemonFavorites.css";

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

      const requests = favorites.map((id) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`).then((res) =>
          res.json()
        )
      );
      const results = await Promise.all(requests);
      setPokemon(
        results.map((mon) => ({
          id: mon.id,
          name: makeCapitalized(mon.name),
          sprite: mon.sprites?.front_default,
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
                {mon.name}
                {mon.sprite && <img src={mon.sprite} alt={mon.name} />}
              </Link>
              <button
                className={
                  favorites.includes(mon.id.toString()) ? "active" : ""
                }
                onClick={() => toggleFavorite(mon.id.toString())}
              >
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
