const BASE_URL = process.env.EXPO_PUBLIC_SPRING_API_URL;

export default async function DeleteComment({ commentId, userId, authToken }) {
  const response = await fetch(`${BASE_URL}/comment/${commentId}/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete comment!");
  }

  return true;
}
