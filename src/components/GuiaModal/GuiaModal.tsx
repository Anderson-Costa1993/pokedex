import { useState } from "react";
import { Pokemon } from "../../types";
import styles from "./contaiLevel.module.css";

type Props = {
  pokemon: Pokemon;
  pokemonEvolutionDetails: Pokemon[];
  setPokemonActive: React.Dispatch<React.SetStateAction<Pokemon | undefined>>;
  scrollToTop: () => void;
};

export function GuiaModal({
  pokemon,
  pokemonEvolutionDetails,
  setPokemonActive,
  scrollToTop,
}: Props) {
  const [activeTab, setActiveTab] = useState("About");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className={styles["nav-list"]} style={{ background: "#fff" }}>
      <>
        <ul className={styles["nav-ul"]}>
          <li>
            <a
              className={styles["nav-ul-li-a"]}
              onClick={() => handleTabClick("About")}
            >
              About
            </a>
          </li>
          <li>
            <a
              className={styles["nav-ul-li-a"]}
              onClick={() => handleTabClick("Base states")}
            >
              Base states
            </a>
          </li>
          <li>
            <a
              className={styles["nav-ul-li-a"]}
              onClick={() => handleTabClick("Evolutions")}
            >
              Evolutions
            </a>
          </li>
        </ul>
      </>

      {activeTab === "About" ? (
        <div className={styles["contain-about"]}>
          <section className={styles["section-about"]}>
            <span>Height: {pokemon.height / 10 + " m"}</span>
            <span>weight: {pokemon.weight / 10 + " Kg"}</span>
            <span>Base Experience: {pokemon.base_experience}</span>
            {pokemon.abilities.map((pokemonAbilities) => (
              <span
                key={pokemonAbilities.ability.name}
                className={styles["states-ability"]}
              >
                Ability: {pokemonAbilities.ability.name}
              </span>
            ))}
          </section>
        </div>
      ) : null}

      {activeTab === "Base states" ? (
        <div
          className={styles["contain-base-states"]}
          style={{ height: "200px" }}
        >
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
                    max="200"
                  ></progress>
                </div>
              </div>
            ))}
          </section>
        </div>
      ) : null}

      {activeTab === "Evolutions" ? (
        <div className={styles["box-evolutiuon"]}>
          <section className={styles["section-evolution"]}>
            {pokemonEvolutionDetails.map((pokemon) => (
              <div className={styles["pokemon-evolution"]} key={pokemon.id}>
                {pokemon.sprites.other.dream_world.front_default ? (
                  <div className={styles["box-image-evolution"]}>
                    <img
                      className={styles["image-evolution"]}
                      src={
                        pokemon.sprites.other["official-artwork"].front_default
                      }
                      alt=""
                      onClick={() => {
                        setPokemonActive(pokemon);
                        scrollToTop();
                        handleTabClick("About")
                      }}
                    />
                  </div>
                ) : (
                  <div className={styles["box-image-evolution"]}>
                    <img
                      className={styles["image-evolution"]}
                      src={
                        pokemon.sprites.other["official-artwork"].front_default
                      }
                      alt=""
                      onClick={() => {
                        setPokemonActive(pokemon);
                        scrollToTop();
                        handleTabClick("About")
                      }}
                    />
                  </div>
                )}
                <span className={styles["pokemon-evolution-name"]}>
                  {pokemon.name}
                </span>
                <div className={styles["box-type-evolution"]}>
                  {pokemon.types.map((type) => (
                    <span className={styles["name-types"]} key={type.type.name}>
                      {" "}
                      {type.type.name}{" "}
                    </span>
                  ))}
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  fill="currentColor"
                  className="bi bi-chevron-compact-down"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"
                  />
                </svg>
              </div>
            ))}
          </section>
        </div>
      ) : null}
    </div>
  );
}
