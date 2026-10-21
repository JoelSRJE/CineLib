const BASE_URL = process.env.EXPO_PUBLIC_SPRING_API_URL;

export default async function UpdateComment({
  commentId,
  userId,
  comment,
  authToken,
}) {
  const response = await fetch(`${BASE_URL}/comment/${commentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      userId,
      comment,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update comment!");
  }

  return data;
}
