const BASE_URL = process.env.EXPO_PUBLIC_SPRING_API_URL;

export default async function getComments({ authToken }) {
  const response = await fetch(`${BASE_URL}/comment/all`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get comments!");
  }

  return data;
}
