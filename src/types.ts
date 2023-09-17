export type PokemonPaginationItem = {
  name: string;
  url: string;
};

export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  specie: string;
  base_experience: number,
  sprites: {
    front_default: string;
    other: {
      dream_world: {
        front_default: string
      }
      "official-artwork": {
        front_default: string
      }
    }
  },

  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    }
  }[];

  abilities: {
      ability: {
        name: string
        url: string;
      }
  }[];

  stats: {
    base_stat: number;
    stat: {
      name:string;
    }
  }[];

  evolution_chain: {
    url: string;
  }

  chain: {
    evolves_to: [{
      evolves_to: [{
        species: {
          name: string;
        url: string
        }
      }]
      species: {
        name: string;
        url: string
      }
    }]
    species: {
      name: string;
      url: string
    }
    color: {
      name: string
    }
  }
};
export type nameEvolution = {
  name: string
}

