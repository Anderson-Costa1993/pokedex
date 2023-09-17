import { useState } from "react";
import { Pokemon } from "../../types";
import styles from "./contaiLevel.module.css";

type Props = {
  pokemon: Pokemon;
  pokemonEvolutionDetails: Pokemon[];
  setPokemonActive:  React.Dispatch<React.SetStateAction<Pokemon | undefined>>;
};

export function GuiaModal({
  pokemon,
  pokemonEvolutionDetails,
  setPokemonActive,
}: Props) {
  const [activeTab, setActiveTab] = useState("About");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div
      className="tabs is-centered is-toggle is-flex-direction-column"
      style={{ background: "#fff" }}
    >
      <>
        <ul>
          <li style={{ fontWeight: "bold" }}>
            <a
              className={styles.listA}
              style={{ border: "none" }}
              onClick={() => handleTabClick("About")}
            >
              About
            </a>
          </li>
          <li>
            <a
              className={styles.listA}
              style={{ border: "none" }}
              onClick={() => handleTabClick("Base states")}
            >
              Base states
            </a>
          </li>
          <li>
            <a
              className={styles.listA}
              style={{ border: "none" }}
              onClick={() => handleTabClick("Evolutions")}
            >
              Evolutions
            </a>
          </li>
        </ul>
      </>

      {activeTab === "About" ? (
        <div
          className="box"
          style={{ height: "200px", textAlign: "center", width: "100%" }}
        >
          <section
            className="is-flex is-flex-direction-column"
            style={{ fontWeight: "bold" }}
          >
            <span>Height: {pokemon.height}</span>
            <span>weight: {pokemon.weight}</span>
            <span>Base Experience: {pokemon.base_experience}</span>
            {pokemon.abilities.map((pokemonAbilities) => (
              <span key={pokemonAbilities.ability.name} className="">
                Ability: {pokemonAbilities.ability.name}
              </span>
            ))}
          </section>
        </div>
      ) : null}

      {activeTab === "Base states" ? (
        <div className="box" style={{ height: "200px" }}>
          <section className="is-flex is-flex-direction-column">
            {pokemon.stats.map((pokemonStates) => (
              <div
                key={pokemonStates.stat.name}
                className="is-flex is-align-items-center is-justify-content-center"
              >
                <div className="is-flex">
                  <span
                    key={pokemonStates.stat.name}
                    className={styles["state-name"]}
                  >
                    {pokemonStates.stat.name}:
                  </span>
                  <span key={pokemonStates.base_stat} className="mr-2">
                    {pokemonStates.base_stat}
                  </span>
                </div>

                <div className={styles.level}>
                  <progress
                    key={pokemonStates.stat.name}
                    className="progress is-primary is-small"
                    value={pokemonStates.base_stat}
                    max="100"
                  ></progress>
                </div>
              </div>
            ))}
          </section>
        </div>
      ) : null}

      {activeTab === "Evolutions" ? (
        <div className={styles['box-evolutiuon']}>
          <section className={styles['section-evolution']}
          >
            {pokemonEvolutionDetails.map((pokemon) => (
              <div
                className={styles['pokemon-evolution']}
                key={pokemon.id}
              >
                {pokemon.sprites.other.dream_world.front_default ? (
                  <div className={styles['box-image-evolution']} >
                  <img
                  className={styles['image-evolution']}
                  src={pokemon.sprites.other["official-artwork"].front_default}
                  alt=""
                  onClick={()=> setPokemonActive(pokemon)}
                />
                </div>
                ) : (
                  <div className={styles['box-image-evolution']}>
                  <img
                  className={styles['image-evolution']}
                  src={pokemon.sprites.other["official-artwork"].front_default}
                  alt=""
                  onClick={()=> setPokemonActive(pokemon)}
                />
                </div>
                )}
                <span className={styles['pokemon-evolution-name']}>{pokemon.name}</span>
                <div className={styles['box-type-evolution']}>
                  {pokemon.types.map((type) => (
                  <span className={styles['name-types']} key={type.type.name} > {type.type.name} </span>
                ))}
                </div>
              </div>
            ))}
          </section>
        </div>
      ) : null}
    </div>
  );
}
