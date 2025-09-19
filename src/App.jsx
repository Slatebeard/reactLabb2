import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PokemonList from "./components/PokemonList.jsx";
import PokemonDetails from "./components/PokemonDetails.jsx";
import PokemonFavorites from "./components/PokemonFavorites.jsx";
import NotFound from "./components/NotFound.jsx";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <h1>PokéDex</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/item/:id" element={<PokemonDetails />} />
            <Route path="/favorites" element={<PokemonFavorites />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
      <footer>
        <p className="footer-text">2025 PokéDex. Created by Slatebeard.</p>
      </footer>
    </Router>
  );
}

export default App;
