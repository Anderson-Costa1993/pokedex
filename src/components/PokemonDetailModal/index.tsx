import { Pokemon } from "../../types";
import { GuiaModal } from "../GuiaModal/GuiaModal";
import styles from "./modal.module.css";
import { useState, useEffect } from "react";
import { pokemonApiService } from "../../services/pokemonApiService";
import { nameEvolution } from "../../types";

type Props = {
  pokemon: Pokemon;
  setPokemonActive:  React.Dispatch<React.SetStateAction<Pokemon | undefined>>;
  onClose: () => void;
};

export function PokemonDetailModal({ pokemon, onClose, setPokemonActive }: Props) {

  const [pokemonSpecie, setPokemonSpecie] = useState<Pokemon>();
  const [pokemonEvolution, setPokemonEvolution] = useState<Pokemon>();
  const [pokemonNameEvolution, setPokemonNameEvolution] = useState<
    nameEvolution[]
  >([]);
  const [pokemonEvolutionDetails, setPokemonEvolutionDetails] = useState<
    Pokemon[]
  >([]);


  useEffect(() => {
    const newPokemonNames: nameEvolution[] = [];
    if (pokemonEvolution) {
      newPokemonNames.push({ name: pokemonEvolution?.chain.species.name });
    }
    pokemonEvolution?.chain.evolves_to.map((pokemon) => {
      newPokemonNames.push({ name: pokemon?.species?.name });
    });
    pokemonEvolution?.chain.evolves_to.map((pokemon) => {
      pokemon.evolves_to.map((pokemon) => {
        newPokemonNames.push({ name: pokemon?.species?.name });
      });
    });
    setPokemonNameEvolution(newPokemonNames);
  }, [pokemonEvolution]);


  useEffect(() => {
    if (pokemon) {
      pokemonApiService.getSpeciesById(pokemon?.id).then((res) => {
        setPokemonSpecie(res);
      });
    }
  }, [pokemon]);

  useEffect(() => {
    if (pokemonSpecie?.evolution_chain.url) {
      pokemonApiService
        .getPokemonByUrl(pokemonSpecie?.evolution_chain.url)
        .then((res) => {
          setPokemonEvolution(res);
        });
    }
  }, [pokemonSpecie]);

  useEffect(() => {
    if (pokemonNameEvolution && pokemon) {
      Promise.all(
        pokemonNameEvolution.map((pokemon) =>
          pokemonApiService.getEvolutionByName(pokemon.name)
        )
      ).then((res) => {
        setPokemonEvolutionDetails(res);
      });
    }
  }, [pokemonNameEvolution]);


  let bgColor =""
  if (pokemon.types[0].type.name === "grass") {
    bgColor = "#8BBE8A"
  } else if (pokemon.types[0].type.name === "fire") {
    bgColor = "#FFA756";
  } else if (pokemon.types[0].type.name === "water") {
    bgColor = "#58ABF6";
  } else if (pokemon.types[0].type.name === "normal") {
    bgColor = "#83A2E3";
  } else if (pokemon.types[0].type.name === "electric") {
    bgColor = "#F2CB55";
  } else if (pokemon.types[0].type.name === "electric") {
    bgColor = "#F2CB55";
  } else if (pokemon.types[0].type.name === "poison") {
    bgColor = "#9F6E97";
  } else {
    bgColor = "#606060f5"
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-content" style={{ maxWidth: "80%", width:"500px", border:"outset 1px", borderColor: bgColor}}>
        <div className="mb-0" style={{ background: bgColor}}>
          <div className={styles['svg-icon']}>
            <svg width="180" height="190" viewBox="0 0 80 70">
              <path
                d="M37.5 0C56.798 0 72.7167 14.361 75 32.9032H56.6974C54.6135 24.298 46.8091 17.9032 37.5 17.9032C28.1909 17.9032 20.3865 24.298 18.3026 32.9032H0C2.28333 14.361 18.202 0 37.5 0Z"
                fill={styles['background-icon']}
              ></path>
              <path
                d="M56.6974 42.0968H75C72.7167 60.639 56.798 75 37.5 75C18.202 75 2.28333 60.639 0 42.0968H18.3026C20.3865 50.702 28.1909 57.0968 37.5 57.0968C46.8091 57.0968 54.6135 50.702 56.6974 42.0968Z"
                fill={styles['background-icon']}
              ></path>
              <path
                d="M37.5 49.8387C44.3655 49.8387 49.9312 44.3145 49.9312 37.5C49.9312 30.6855 44.3655 25.1613 37.5 25.1613C30.6345 25.1613 25.0688 30.6855 25.0688 37.5C25.0688 44.3145 30.6345 49.8387 37.5 49.8387Z"
                fill={styles['background-icon']}
              ></path>
            </svg>
          </div>
          <figure className={styles.figure}>
            {pokemon.sprites.other.dream_world.front_default ? (
              <img
              className={styles.imgpokemon}
              src={pokemon.sprites.other["official-artwork"].front_default}
            />
            ): (<img
              className={styles.imgpokemon}
              src={pokemon.sprites.other["official-artwork"].front_default}
            />)}
          </figure>
          <h1 className={styles.name}>{pokemon.name}</h1>
          <GuiaModal
          setPokemonActive={setPokemonActive}
          pokemonEvolutionDetails={pokemonEvolutionDetails}
          pokemon={pokemon}
          />
        </div>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={() => onClose()}
      ></button>
    </div>
  );
}
