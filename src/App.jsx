import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import pokemonList from "./components/PokemonList.jsx";

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <h1>Pokémon App</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<pokemonList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
