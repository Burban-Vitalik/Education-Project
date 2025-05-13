import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function checkAuth() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return false;
  }

  try {
    jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return true;
  } catch (error) {
    console.error("Token verification failed:", error);
    return false;
  }
}
