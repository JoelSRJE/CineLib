const BASE_URL = process.env.EXPO_PUBLIC_SPRING_API_URL;

export default async function LoginUser({ email, password }) {
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
