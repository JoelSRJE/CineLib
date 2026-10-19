const BASE_URL = process.env.EXPO_PUBLIC_SPRING_API_URL;

export default async function updateUser({
  userId,
  username,
  email,
  authToken,
}) {
  const response = await fetch(`${BASE_URL}/user/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      username,
      email,
    }),
  });

  if (!response.ok) {
    const message = await response.text();

    throw new Error(message || `Failed to update user: ${userId}`);
  }

  return response.json();
}
