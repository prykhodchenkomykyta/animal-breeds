export type Breed = {
  id: string | number;
  name: string;
  temperament?: string;
  origin?: string;
  description?: string;
  life_span?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  weight?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  height?: any;
  bred_for?: string;
  breed_group?: string;
  reference_image_id?: string;
};

const DOG_API_BASE = "https://api.thedogapi.com/v1";
const CAT_API_BASE = "https://api.thecatapi.com/v1";

async function fetchJson(url: string) {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };
  
  const res = await fetch(url, { headers, next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  return res.json();
}

export async function getAllDogBreeds(): Promise<Breed[]> {
  const url = `${DOG_API_BASE}/breeds`;
  return fetchJson(url);
}

export async function getAllCatBreeds(): Promise<Breed[]> {
  const url = `${CAT_API_BASE}/breeds`;
  return fetchJson(url);
}

export async function getDogBreedImageByReference(reference_image_id: string) {
  if (!reference_image_id) return null;
  const url = `${DOG_API_BASE}/images/${reference_image_id}`;
  try {
    return await fetchJson(url);
  } catch {
    return null;
  }
}

export async function getBreedImages(animal: "dog" | "cat", breedId: string | number, limit = 8) {
  if (animal === "dog") {
    const url = `${DOG_API_BASE}/images/search?breed_id=${breedId}&limit=${limit}`;
    return fetchJson(url);
  } else {
    const url = `${CAT_API_BASE}/images/search?breed_ids=${breedId}&limit=${limit}`;
    return fetchJson(url);
  }
}
