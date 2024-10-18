import axios from "axios";

type Pokemon = {
  name: string;
  url: string;
};

type PokemonDetails = {
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string;
  };
};

type PokemonSpecies = {
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string;
  };
};

export const fetchPokemon = async (
  limit: number,
  offset: number
): Promise<Pokemon[]> => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    throw error;
  }
};

export const fetchPokemonDetails = async (
  id: string | string[]
): Promise<PokemonDetails> => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokémon details:", error);
    throw error;
  }
};

export const fetchPokemonSpecies = async (
  id: string | string[]
): Promise<PokemonSpecies> => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokémon species:", error);
    throw error;
  }
};
