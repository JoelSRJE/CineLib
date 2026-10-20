const BASE_URL = "https://api.themoviedb.org/3";

export default async function getGenres(genreIds, mediaType = "movie") {
  if (!genreIds?.length) {
    return [];
  }

  const apiKey = process.env.EXPO_PUBLIC_TMDB_API_KEY;

  if (!apiKey) {
    throw new Error("TMDB API key is missing!");
  }

  const response = await fetch(
    `${BASE_URL}/genre/${mediaType}/list?api_key=${apiKey}`,
  );

  if (!response.ok) {
    throw new Error(`Genre request failed: ${response.status}`);
  }

  const data = await response.json();

  return genreIds
    .map((id) => data.genres.find((genre) => genre.id === id)?.name)
    .filter(Boolean);
}
