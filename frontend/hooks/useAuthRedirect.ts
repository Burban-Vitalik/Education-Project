"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

export const useAuthRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = Cookies.get("token");

    debugger;

    if (!token && !pathname.startsWith("/login")) {
      router.push("/login");
    }
  }, [router, pathname]);
};
