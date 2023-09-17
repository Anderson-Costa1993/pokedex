import { Pokemon } from "../../types"

type Props = {
  pokemon: Pokemon;
};

export function PokemonCard(props: Props) {
  const { pokemon } = props;

  let bgColor =""

  if (pokemon.types[0].type.name === "grass") {
    bgColor = "rgba(139,190,138,1)"
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
    bgColor = "#3f3f3f"
  }

  return (
    <div className="card" style={{width: "80%", margin:"0 auto"}}>
      <div className="card-image" style={{height:"150px"}}>
        <figure className="image is-4by3">
          <img src={pokemon.sprites.other.dream_world.front_default} alt="Placeholder image" style={{width:"110px", margin: "0 auto"}} />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4 is-capitalized" >{pokemon.name}</p>
            <p className="subtitle is-6">@{pokemon.id}</p>
          </div>
        </div>
        <div className="content">
          {
            pokemon.types.map(pokemonType => (
              <span key={pokemonType.type.name} className="tag mr-2 is-capitalized is-size-8" style={{background: bgColor, color:"white"}}>{pokemonType.type.name}</span>
            ))
          }

        </div>
      </div>
    </div>
  )
}