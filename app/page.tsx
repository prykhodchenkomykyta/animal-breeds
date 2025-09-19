import React from "react";
import BreedCard from "../components/BreedCard";
import { getAllCatBreeds, getAllDogBreeds } from "../lib/api";
import clsx from "clsx";

type CardData = {
  id: string | number;
  name: string;
  image?: string | null;
  animal: "dog" | "cat";
};

function sample<T>(arr: T[], n: number) {
  const copy = [...arr];
  const out: T[] = [];
  while (out.length < n && copy.length > 0) {
    const i = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(i, 1)[0]);
  }
  return out;
}

export default async function Home() {
  const [dogBreeds, catBreeds] = await Promise.all([
    getAllDogBreeds(),
    getAllCatBreeds(),
  ]);

  const dogs = sample(dogBreeds, 6);
  const cats = sample(catBreeds, 6);

  const dogCards: CardData[] = await Promise.all(
    dogs.map(
      async (b: {
        id: string | number;
        name: string;
        reference_image_id?: string;
      }) => {
        let image: string | null = null;
        if (b.reference_image_id) {
          try {
            const img = await fetch(
              `https://api.thedogapi.com/v1/images/${b.reference_image_id}`
            );
            if (img.ok) {
              const j = await img.json();
              image = j.url ?? null;
            }
          } catch {
            image = null;
          }
        }
        if (!image) {
          try {
            const imgs = await fetch(
              `https://api.thedogapi.com/v1/images/search?breed_id=${b.id}&limit=1`
            );
            if (imgs.ok) {
              const j = await imgs.json();
              image = j[0]?.url ?? null;
            }
          } catch {
            image = null;
          }
        }
        return { id: b.id, name: b.name, animal: "dog" as const, image };
      }
    )
  );

  const catCards: CardData[] = await Promise.all(
    cats.map(
      async (b: {
        id: string | number;
        name: string;
        reference_image_id?: string;
      }) => {
        let image: string | null = null;
        if (b.reference_image_id) {
          try {
            const img = await fetch(
              `https://api.thecatapi.com/v1/images/${b.reference_image_id}`
            );
            if (img.ok) {
              const j = await img.json();
              image = j.url ?? null;
            }
          } catch {
            image = null;
          }
        }
        if (!image) {
          try {
            const imgs = await fetch(
              `https://api.thecatapi.com/v1/images/search?breed_ids=${b.id}&limit=1`
            );
            if (imgs.ok) {
              const j = await imgs.json();
              image = j[0]?.url ?? null;
            }
          } catch {
            image = null;
          }
        }
        return { id: b.id, name: b.name, animal: "cat" as const, image };
      }
    )
  );

  const combined = [...dogCards, ...catCards];

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Random Breeds</h2>
          <p className="text-sm text-slate-500">
            A random mix of dog and cat breeds fetched from public APIs.
          </p>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {combined.map((comb) => (
          <BreedCard
            key={`${comb.animal}-${comb.id}`}
            id={comb.id}
            name={comb.name}
            imageUrl={comb.image ?? undefined}
            animal={comb.animal}
          />
        ))}
      </div>

      <div className="mt-8 text-sm text-slate-500">
        Tip: Click a card to see detailed info and a gallery for that breed.
      </div>
    </section>
  );
}
