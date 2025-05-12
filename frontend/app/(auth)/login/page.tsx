"use client";

import { LoginForm } from "../../components/sections/auth/LoginForm";
import { logout } from "../../helpers/logout";

export default function Login() {
  return (
    <div>
      Login
      <div className="w-[350px] m-auto">
        <LoginForm />
        <button onClick={logout}>Log out</button>
      </div>
    </div>
  );
}
