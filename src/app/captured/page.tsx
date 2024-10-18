"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GridIcon from "../../assets/svg/grid.svg";
import ListIcon from "../../assets/svg/list.svg";
import SearchIcon from "../../assets/svg/search.svg";
import moment from "moment";

const Captured = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Get all keys from localStorage
  const keys = Object.keys(localStorage);

  return (
    <div
      className="bg-[#e5e5f7] bg-opacity-20 p-8"
      style={{
        backgroundImage:
          "repeating-radial-gradient(circle at 0 0, transparent 0, #e5e5f7 40px), repeating-linear-gradient(#45c8f755, #45c8f7)",
      }}
    >
      <div className="flex flex-col mx-72">
        <div className="flex items-center justify-center">
          <h2 className="text-3xl font-semibold font-mono">Captured</h2>
        </div>
        <div className="flex justify-between my-4">
          <div>
            <Image src={SearchIcon} alt="search-icon" width={30} />
          </div>
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
            viewMode === "grid"
              ? "grid grid-cols-3 gap-4"
              : "flex flex-col gap-4"
          }
        >
          {keys.map((key) => {
            const value = localStorage.getItem(key);
            const parsedValue = JSON.parse(value);
            const pokedexId = parsedValue.pokedexId;
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedexId}.png`;

            return (
              <Link key={key} href={`/pokedex/${pokedexId}`}>
                <Card
                  key={key}
                  className="shadow-lg hover:shadow-xl transition"
                >
                  <CardHeader>
                    <CardTitle className="font-mono capitalize text-2xl">
                      {parsedValue.nickname}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {viewMode === "list" ? (
                      <div>
                        <div className="flex gap-10">
                          <Image
                            src={imageUrl}
                            alt=""
                            width={228}
                            height={228}
                          />
                          <div className="flex flex-col gap-8">
                            <div className="flex flex-col">
                              <p className="font-mono capitalize text-xl">
                                Nickname:
                                <span className="font-semibold">
                                  {parsedValue.nickname}
                                </span>
                              </p>
                            </div>

                            <div>
                              <p className="font-mono capitalize text-xl">
                                Date:
                                <span className="font-semibold">
                                  {moment(parsedValue.captureDate).format(
                                    "MMMM Do YYYY"
                                  )}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <Image src={imageUrl} alt="" width={270} height={270} />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Captured;
