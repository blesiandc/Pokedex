// app/actions/fetchPokemon.ts

import axios from "axios";

// Define the type for the Pokemon object
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
    return response.data.results; // Return the fetched data
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    throw error; // Rethrow the error for handling in the component
  }
};
