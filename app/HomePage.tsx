"use client";

import React, { useState } from "react";
import BreedCard from "@/components/BreedCard";
import SearchBar, { BreedItem } from "@/components/SearchBar";

type Props = {
  initialBreeds: BreedItem[];
};

export default function HomeClient({ initialBreeds }: Props) {
  const [filtered, setFiltered] = useState<BreedItem[]>(initialBreeds);

  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Random Breeds</h2>
          <p className="text-sm text-slate-500">A mix of dog and cat breeds</p>
        </div>
        <SearchBar breeds={initialBreeds} onFilter={setFiltered} />
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((c) => (
          <BreedCard
            key={`${c.animal}-${c.id}`}
            id={c.id}
            name={c.name}
            imageUrl={c.image ?? undefined}
            animal={c.animal}
          />
        ))}
      </div>
    </section>
  );
}
