const BASE_URL = process.env.EXPO_PUBLIC_SPRING_API_URL;

export default async function CreateComment({
  comment,
  mediaId,
  mediaType,
  userId,
  authToken,
}) {
  const response = await fetch(`${BASE_URL}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      comment,
      mediaId,
      mediaType,
      userId,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create comment!");
  }

  return data;
}
