import { Pokemon } from "../../types";
import  styles from "./pokemonCard.module.css"

type Props = {
  pokemon: Pokemon;
};

export function PokemonCard(props: Props) {
  const { pokemon } = props;

  let bgColor = "";

  if (pokemon.types[0].type.name === "grass") {
    bgColor = "rgba(139,190,138,1)";
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
    bgColor = "#3f3f3f";
  }

  return (
    <div className={styles['contain-card']}>
      <div className={styles['card-image']}>
        <figure className={styles.figure}>
          {pokemon.sprites.other.dream_world.front_default ? (
            <img
              src={pokemon.sprites.other.dream_world.front_default}
              alt="Placeholder image"
              style={{ width: "80px", margin: "0 auto" }}
            />
          ) : (
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt="Placeholder image"
              style={{ width: "120px",  margin: "0 auto" }}
            />
          )}
        </figure>
      </div>
      <div className={styles['card-content']}>
        <div className="media">
          <div className="media-content">
            <p className={styles['name-pokemon']}>{pokemon.name}</p>
            <p className={styles['id-pokemon']}>@{pokemon.id}</p>
          </div>
        </div>
        <div className="content">
          {pokemon.types.map((pokemonType) => (
            <span
              key={pokemonType.type.name}
              className="tag mr-2 is-capitalized is-size-8"
              style={{ background: bgColor, color: "white" }}
            >
              {pokemonType.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
