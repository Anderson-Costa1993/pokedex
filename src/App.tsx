import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { pokemonApiService } from "./services/pokemonApiService";
import type { Pokemon, PokemonPaginationItem, nameEvolution } from "./types";
import { PokemonCard } from "./components/PokemonCard";
import { PokemonDetailModal } from "./components/PokemonDetailModal";
import { Navbar } from "./Navbar";
// import "./App.css";


function App() {
  const [pokemons, setPokemons] = useState<PokemonPaginationItem[]>([]);
  const [pokemonsDetails, setPokemonsDetails] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const [pokemonActive, setPokemonActive] = useState<Pokemon>();
  const [pokemonSpecie, setPokemonSpecie] = useState<Pokemon>()
  const [pokemonEvolution, setPokemonEvolution] = useState<Pokemon>();
  const [pokemonNameEvolution, setPokemonNameEvolution] = useState<nameEvolution[]>([])
  const [pokemonEvolutionDetails, setPokemonEvolutionDetails] = useState<Pokemon[]>([]);

  useEffect ( ()=> {
    const newPokemonNames: nameEvolution[] = [];
        if(pokemonEvolution) {
        newPokemonNames.push(
          {name: pokemonEvolution?.chain.species.name},
        )
        }
        pokemonEvolution?.chain.evolves_to.map( (pokemon) => {
            newPokemonNames.push (
              {name: pokemon?.species?.name}
            )
        })
      pokemonEvolution?.chain.evolves_to.map( (pokemon) => {
        pokemon.evolves_to.map( pokemon => {
          newPokemonNames.push (
            {name: pokemon?.species?.name}
          )
      })})
      setPokemonNameEvolution(newPokemonNames)
  },[pokemonEvolution])

  useEffect(() => {
    pokemonApiService
      .getPokemons({
        limit: 10,
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

  useEffect(() => {
    if (pokemonActive) {
    (
        pokemonApiService.getSpeciesById(pokemonActive?.id)
    ).then((res) => {
      setPokemonSpecie(res)
    });
  }}, [pokemonActive]);


  useEffect(() => {
    if (pokemonSpecie?.evolution_chain.url) {
    (
        pokemonApiService.getPokemonByUrl(pokemonSpecie?.evolution_chain.url)
    ).then((res) => {
      setPokemonEvolution(res)
    });
  }}, [pokemonSpecie]);

useEffect(() => {
  if (pokemonNameEvolution && pokemonActive) {
    Promise.all
    (pokemonNameEvolution.map( (pokemon) => pokemonApiService.getEvolutionByName(pokemon.name))
    ).then( (res) => {
      setPokemonEvolutionDetails(res)
    })
  }
}, [pokemonNameEvolution])

  return (
    <>
    <Navbar />
      <main className="container" style={{ marginTop: "30px" }}>
        <div className="columns is-multiline">
          {pokemonsDetails.map((pokemon) => {
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
          style={{width: "100%", alignItems:"center", display: "flex", justifyContent: "center"}}
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
              pokemonEvolutionDetails={pokemonEvolutionDetails}
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
