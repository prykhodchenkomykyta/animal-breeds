// app/page.tsx
import React from "react";
import { getAllCatBreeds, getAllDogBreeds } from "@/lib/api";
import HomeClient from "./HomePage";

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

  const dogs = sample(dogBreeds, 12);
  const cats = sample(catBreeds, 12);

  const dogCards = await Promise.all(
    dogs.map(async (b: unknown) => {
      let image: string | null = null;
      if (typeof b === "object" && b !== null && "reference_image_id" in b) {
        try {
          const img = await fetch(
            `https://api.thedogapi.com/v1/images/${b.reference_image_id}`
          );
          if (img.ok) {
            const j = await img.json();
            image = j.url ?? null;
          }
        } catch {}
      }
      return {
        id: (b as { id: string; name: string }).id,
        name: (b as { id: string; name: string }).name,
        animal: "dog" as const,
        image,
      };
    })
  );

  const catCards = await Promise.all(
    cats.map(async (b: unknown) => {
      let image: string | null = null;
      if (typeof b === "object" && b !== null && "reference_image_id" in b) {
        try {
          const img = await fetch(
            `https://api.thecatapi.com/v1/images/${
              (b as { reference_image_id: string }).reference_image_id
            }`
          );
          if (img.ok) {
            const j = await img.json();
            image = j.url ?? null;
          }
        } catch {}
      }
      return {
        id: (b as { id: string }).id,
        name: (b as { name: string }).name,
        animal: "cat" as const,
        image,
      };
    })
  );

  const combined = [...dogCards, ...catCards];

  return <HomeClient initialBreeds={combined} />;
}
