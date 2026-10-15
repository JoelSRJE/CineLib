const BASE_URL = process.env.EXPO_PUBLIC_SPRING_API_URL;

export default async function RegisterUser({ username, email, password }) {
  const response = await fetch(`${BASE_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  if (!response.ok) {
    const message = await response.text();

    throw new Error(message || "Register failed. Try again!");
  }

  return response.json();
}
