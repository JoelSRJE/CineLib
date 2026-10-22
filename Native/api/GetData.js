const BASE_URL = "https://api.themoviedb.org/3";

export default async function getMovieData(endpoint, page = 1) {
  const apiKey = process.env.EXPO_PUBLIC_TMDB_API_KEY;

  if (!apiKey) {
    throw new Error("TMDB API key is missing");
  }

  const response = await fetch(
    `${BASE_URL}${endpoint}?api_key=${apiKey}&page=${page}`,
  );

  if (!response.ok) {
    throw new Error(`TMDB get data request failed: ${response.status}`);
  }

  const data = await response.json();

  return data;
}
