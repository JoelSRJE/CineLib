const BASE_URL = process.env.EXPO_PUBLIC_SPRING_API_URL;

export async function LoginUser({ email, password }) {
  const response = await fetch(`${BASE_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    const message = await response.text();

    throw new Error(message || "Failed to login. Try again!");
  }

  return response.json();
}

export default async function logoutUser({ userId, authToken }) {
  const response = await fetch(`${BASE_URL}/user/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    const message = await response.text();

    throw new Error(message || "Failed to log out on the server!");
  }

  return response.text();
}
