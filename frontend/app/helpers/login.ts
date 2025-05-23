export async function login(values: { email: string; password: string }) {
  const response = await fetch("http://localhost:4200/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new Error("register failed");
  } else {
    return response.json();
  }
}
