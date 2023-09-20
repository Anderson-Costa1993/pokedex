import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { pokemonApiService } from "./services/pokemonApiService";
import type { Pokemon, PokemonPaginationItem } from "./types";
import { PokemonCard } from "./components/PokemonCard";
import { PokemonDetailModal } from "./components/PokemonDetailModal";
import { Navbar } from "./components/Navbar";
// import "./App.css";

function App() {
  const [pokemons, setPokemons] = useState<PokemonPaginationItem[]>([]);
  const [pokemonsDetails, setPokemonsDetails] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const [pokemonActive, setPokemonActive] = useState<Pokemon>();
  const [filtroBusca, setFiltroBusca] = useState("");

  useEffect(() => {
    pokemonApiService
      .getPokemons({
        limit: 20,
        page,
      })
      .then((res) => {
        setPokemons(res);
      });
  }, [page]);


  useEffect(() => {
    Promise.all(
      pokemons.map((pokemon) => pokemonApiService.getPokemonByUrl(pokemon.url))
    ).then((res) => {
      setPokemonsDetails(res);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }, [pokemons]);

  return (
    <>
      <Navbar filtroBusca={filtroBusca} setFiltroBusca={setFiltroBusca} />
      <main className="container" style={{ marginTop: "30px" }}>
        <div className="columns is-multiline">
          {pokemonsDetails
            .filter((pokemon) =>
              pokemon.name
                .toLocaleLowerCase()
                .includes(filtroBusca.toLocaleLowerCase())
            )
            .map((pokemon) => {
              return (
                <div
                  key={pokemon.id}
                  className="column is-3"
                  onClick={() => setPokemonActive(pokemon)}
                >
                  <PokemonCard pokemon={pokemon} />
                </div>
              );
            })}
        </div>

        <nav
          style={{
            width: "100%",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
          role="navigation"
          aria-label="pagination"
        >
          <div className="buttons">
            <button
              className="button  is-dark is-small mr-8 "
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              className="button is-dark is-small"
              onClick={() => setPage(page + 1)}
            >
              Next page
            </button>
          </div>
        </nav>

        {pokemonActive &&
          createPortal(
            <PokemonDetailModal
              pokemon={pokemonActive}
              onClose={() => setPokemonActive(undefined)}
              setPokemonActive={setPokemonActive}
            />,
            document.body
          )}
      </main>
    </>
  );
}

export default App;
