"use client";

import React, { useState, useMemo } from "react";
import clsx from "clsx";

export type BreedItem = {
  id: string | number;
  name: string;
  animal: "dog" | "cat";
  image?: string | null;
};

type Props = {
  breeds: BreedItem[];
  onFilter: (filtered: BreedItem[]) => void;
};

export default function SearchBar({ breeds, onFilter }: Props) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const suggestions = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return breeds.filter((b) => b.name.toLowerCase().includes(q)).slice(0, 8);
  }, [query, breeds]);

  function handleSelect(name: string) {
    setQuery(name);
    onFilter(breeds.filter((b) => b.name.toLowerCase() === name.toLowerCase()));
    setFocused(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);
    if (value === "") {
      onFilter(breeds);
    } else {
      const q = value.toLowerCase();
      onFilter(breeds.filter((b) => b.name.toLowerCase().includes(q)));
    }
  }

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        placeholder="Search..."
        className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {focused && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 bg-slate-800 border rounded-lg mt-1 shadow z-10 max-h-60 overflow-y-auto">
          {suggestions.map((s) => (
            <li
              key={`${s.animal}-${s.id}`}
              onClick={() => handleSelect(s.name)}
              className={clsx(
                "px-3 py-2 cursor-pointer hover:bg-slate-100 text-sm"
              )}
            >
              {s.name}{" "}
              <span className="text-xs text-slate-400">({s.animal})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
