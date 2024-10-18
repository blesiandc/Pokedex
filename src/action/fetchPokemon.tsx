import axios from "axios";

type Pokemon = {
  name: string;
  url: string;
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
