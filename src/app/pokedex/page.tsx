"use client";

import { useEffect, useState } from "react";
import { fetchPokemon } from "../../action/fetchPokemon";
import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GridIcon from "../../assets/svg/grid.svg";
import ListIcon from "../../assets/svg/list.svg";

type Pokemon = {
  name: string;
  url: string;
};

const Pokedex = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [offset, setOffset] = useState(0);
  const limit = 10;

  const fetchPokemonData = async (offset: number) => {
    try {
      const data = await fetchPokemon(limit, offset);
      setPokemon((prev) => [...prev, ...data]);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("Error fetching Pokémon data.");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    setOffset((prev) => prev + limit);
    fetchPokemonData(offset + limit);
  };

  useEffect(() => {
    fetchPokemonData(offset);
  }, [offset]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        loading
      )
        return;
      loadMore();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  if (loading && pokemon.length === 0) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex flex-col my-4 mx-24">
      <div className="flex items-center justify-center">
        <h2 className="text-3xl font-semibold">Pokedex</h2>
      </div>
      <div className="flex justify-between my-4">
        <div>Search</div>
        <div className="flex gap-4">
          <button onClick={() => setViewMode("list")}>
            <Image src={ListIcon} alt="list-icon" width={30} />
          </button>
          <button onClick={() => setViewMode("grid")}>
            <Image src={GridIcon} alt="grid-icon" width={30} />
          </button>
        </div>
      </div>
      <div
        className={
          viewMode === "grid" ? "grid grid-cols-3 gap-4" : "flex flex-col gap-4"
        }
      >
        {pokemon.map((poke: Pokemon, index: number) => {
          const pokedexNo = poke.url.split("/")[6];
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedexNo}.png`;

          return (
            <Card key={index} className="shadow-lg hover:shadow-xl transition">
              <CardHeader>
                <CardTitle>{poke.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Image
                  src={imageUrl}
                  alt={poke.name}
                  width={128}
                  height={128}
                  className="object-contain"
                />
              </CardContent>
            </Card>
          );
        })}
      </div>
      {loading && <div>Loading more Pokémon...</div>}{" "}
    </div>
  );
};

export default Pokedex;
