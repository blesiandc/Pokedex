// app/pokedex/page.tsx

"use client";

import { useEffect, useState } from "react";
import { fetchPokemon } from "../../action/fetchPokemon"; // Import your fetch function

// Define the type for the Pokemon object
type Pokemon = {
  name: string;
  url: string;
};

const Pokedex = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const limit = 10; // Number of Pokémon to fetch
  const offset = 0; // Starting point for fetching Pokémon

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const data = await fetchPokemon(limit, offset); // Call the fetch function
        setPokemon(data); // Set the fetched data
      } catch (error) {
        setError("Error fetching Pokémon data."); // Set error message
      } finally {
        setLoading(false); // Stop loading
      }
    };

    getPokemon(); // Call the fetch function
  }, []); // Empty dependency array to fetch only on component mount

  if (loading) return <div>Loading...</div>; // Show loading state
  if (error) return <div className="text-red-500">{error}</div>; // Show error if it exists

  return (
    <div className="flex flex-col my-4 mx-24">
      <div className="flex items-center justify-center">
        <h2 className="text-3xl font-semibold">Pokedex</h2>
      </div>
      <div className="flex justify-between">
        <div>Search</div>
        <div>Grid Icon</div>
      </div>
      <div>
        <h1>Pokémon List</h1>
        <ul className="grid grid-cols-2 gap-4">
          {pokemon.map((poke: Pokemon, index: number) => {
            // Extract Pokémon ID from the URL
            const pokedexNo = poke.url.split("/")[6]; // Extract the ID from the URL
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedexNo}.png`; // Construct the image URL

            return (
              <li key={index} className="flex flex-col items-center">
                <img src={imageUrl} alt={poke.name} className="w-24 h-24" />{" "}
                {/* Display Pokémon image */}
                <p>{poke.name}</p> {/* Display Pokémon name */}
              </li>
            );
          })}
        </ul>
      </div>
      <div>Button</div>
    </div>
  );
};

export default Pokedex;
