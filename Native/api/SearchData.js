const BASE_URL = "https://api.themoviedb.org/3";

export default async function searchData({ searchWord }) {
  const apiKey = process.env.EXPO_PUBLIC_TMDB_API_KEY;

  if (!apiKey) {
    throw new Error("TMDB API key is missing");
  }

  const response = await fetch(
    `${BASE_URL}/search/multi?api_key=${apiKey}&query=${encodeURIComponent(searchWord)}`,
  );

  if (!response.ok) {
    throw new Error(`TMDB search request failed: ${response.status}`);
  }

  const data = await response.json();

  return data;
}
