export async function logout() {
  return fetch("http://localhost:4200/auth/logout", {
    method: "POST",
    credentials: "include",
  });
}
