import axios from "axios";
import type { PokemonPaginationItem, Pokemon } from "../types";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

const http = axios.create({
  baseURL: API_URL
});

type PageOptions = {
  page: number;
  limit: number;
};

export const pokemonApiService = {
  getPokemons: async (options?: PageOptions) => {
    const limit = options?.limit || 20;
    const page = options?.page || 1;

    const response = await http.get("/", {
      params: {
        limit: limit,
        offset: (page * limit) - limit
      }
    });
    return response.data.results as PokemonPaginationItem[];
  },

  getPokemonById: async (id: number) => {
    const response = await http.get<Pokemon>(`/pokemons/${id}`);
    return response.data;
  },

  getPokemonByUrl: async (url: string) => {
    const response = await axios.get<Pokemon>(url);
    return response.data
  },

  getEvolutionByid: async (url: string) => {
    const response = await axios.get<Pokemon>(url);
    return response.data
  },

  getEvolutionByName: async (name: string) => {
    const response = await http.get<Pokemon>(name);
    return response.data
  },

  getSpeciesById: async (id: number) => {
    const response = await http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
    return response.data
  },

};
