import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PokemonList from "./components/PokemonList.jsx";
import PokemonDetails from "./components/PokemonDetails.jsx";

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <h1>Pokémon App</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/item/:id" element={<PokemonDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
