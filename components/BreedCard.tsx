import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  id: string | number;
  name: string;
  imageUrl?: string | null;
  animal: "dog" | "cat";
};

export default function BreedCard({ id, name, imageUrl, animal }: Props) {
  const href = `/breed/${animal}/${id}`;
  return (
    <Link href={href} className="block">
      <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
        <div className="h-48 w-full bg-slate-100 relative">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400">
              No image
            </div>
          )}
        </div>

        <div className="p-3">
          <div className="text-sm text-slate-500">{animal.toUpperCase()}</div>
          <h3 className="mt-1 font-medium">{name}</h3>
        </div>
      </div>
    </Link>
  );
}
