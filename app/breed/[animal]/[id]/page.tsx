import React from "react";
import Image from "next/image";
import {
  getAllCatBreeds,
  getAllDogBreeds,
  getBreedImages,
} from "../../../../lib/api";

type Props = {
  params: { animal: string; id: string };
};

async function findBreed(animal: "dog" | "cat", id: string | number) {
  if (animal === "dog") {
    const all = await getAllDogBreeds();
    return all.find(
      (b: unknown) => String((b as { id: unknown }).id) === String(id)
    );
  } else {
    const all = await getAllCatBreeds();
    return all.find(
      (b: unknown) => String((b as { id: unknown }).id) === String(id)
    );
  }
}

export default async function BreedPage({ params }: Props) {
  const animal = params.animal as "dog" | "cat";
  const id = params.id;

  const breed = await findBreed(animal, id);
  if (!breed) {
    return <div>Breed not found</div>;
  }

  const images = await getBreedImages(animal, id, 12).catch(() => []);

  return (
    <div>
      <div className="bg-slate-800 flex flex-col md:flex-row gap-6 items-start">
        <div className="w-full md:w-1/3 border rounded-lg overflow-hidden shadow">
          {images[0]?.url ? (
            <div className="relative h-64 w-full">
              <Image
                src={images[0].url}
                alt={breed.name}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-white">
              No image
            </div>
          )}
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-semibold">{breed.name}</h2>
          {breed.breed_group && (
            <div className="text-sm text-white">{breed.breed_group}</div>
          )}
          <p className="mt-3 text-white">
            {breed.description ??
              breed.temperament ??
              "No description available."}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-white">
            {breed.origin && (
              <div>
                <strong>Origin:</strong> {breed.origin}
              </div>
            )}
            {breed.life_span && (
              <div>
                <strong>Life span:</strong> {breed.life_span}
              </div>
            )}
            {breed.weight && (
              <div>
                <strong>Weight:</strong>{" "}
                {typeof breed.weight === "string"
                  ? breed.weight
                  : JSON.stringify(breed.weight)}
              </div>
            )}
          </div>
        </div>
      </div>

      <section className="mt-8">
        <h3 className="text-lg font-medium mb-3">Gallery</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {images.length > 0 ? (
            images.map((img: unknown, idx: number) => (
              <div
                key={idx}
                className="relative h-40 w-full rounded overflow-hidden border"
              >
                <Image
                  src={(img as { url: string }).url}
                  alt={`${breed.name} ${idx}`}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))
          ) : (
            <div className="text-white">
              No images available for this breed.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
