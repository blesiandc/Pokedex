"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DatePickerDemo } from "@/components/ui/date-picker";

import {
  fetchPokemonDetails,
  fetchPokemonSpecies,
} from "../../../action/fetchPokemon";

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
  flavor_text_entries: string;
  flavor_text: string;
};

const PokemonDetail = () => {
  const pathname = usePathname();
  const pokedexId = pathname.split("/").pop();

  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [species, setspecies] = useState<PokemonSpecies | null>(null);

  const [nickname, setNickname] = useState<string>("");
  const [captureDate, setCaptureDate] = useState<Date | null>(null);

  // Fetch Pokemon details
  useEffect(() => {
    if (pokedexId) {
      const getPokemonDetails = async () => {
        try {
          const data = await fetchPokemonDetails(pokedexId);
          setPokemon(data);
        } catch (error) {
          setError("Error fetching Pokémon details.");
        } finally {
          setLoading(false);
        }
      };
      getPokemonDetails();
    }
  }, [pokedexId]);

  // Fetch Pokemon species (for flavor text)
  useEffect(() => {
    if (pokedexId) {
      const getPokemonDetails = async () => {
        try {
          const data = await fetchPokemonSpecies(pokedexId);
          setspecies(data?.flavor_text_entries[0]);
        } catch (error) {
          setError("Error fetching Pokémon details.");
        } finally {
          setLoading(false);
        }
      };
      getPokemonDetails();
    }
  }, [pokedexId]);

  // Load captured Pokémon info from localStorage
  useEffect(() => {
    const capturedPokemon = localStorage.getItem(`captured-${pokedexId}`);
    if (capturedPokemon) {
      const { nickname, captureDate } = JSON.parse(capturedPokemon);
      setNickname(nickname);
      setCaptureDate(new Date(captureDate));
    }
  }, [pokedexId]);

  const handleCapture = () => {
    if (!nickname || !captureDate) {
      alert("Please enter both a nickname and a capture date.");
      return;
    }

    const capturedPokemon = {
      pokedexId,
      nickname,
      captureDate: captureDate.toISOString(),
    };

    localStorage.setItem(
      `captured-${pokedexId}`,
      JSON.stringify(capturedPokemon)
    );

    alert("Pokémon tagged as captured!");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <Image
          src={pokemon?.sprites.front_default}
          alt={pokemon?.name}
          width={356}
          height={356}
        />
        <p className="text-3xl font-semibold font-mono capitalize">
          {pokemon?.name}
        </p>
      </div>
      <div className="bg-sky-200 p-4 my-4 rounded-lg font-sans">
        {species?.flavor_text}
      </div>
      <div className="w-6/12 flex flex-col justify-center p-10 gap-4">
        <p className="flex items-center justify-center">Tag as Captured</p>
        <Label htmlFor="nickname">Nickname</Label>
        <Input
          type="text"
          id="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Enter nickname"
        />
        <Label htmlFor="date">Date</Label>
        <DatePickerDemo selected={captureDate} onSelectDate={setCaptureDate} />
        <div className="flex items-center justify-center">
          <Button onClick={handleCapture}>Tag as Captured</Button>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
