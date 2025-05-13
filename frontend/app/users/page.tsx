"use client";

import { useQuery } from "@apollo/client";
import { UserCard } from "../../components/cards/UserCard";
import { GET_USERS } from "../../lib/graphql/queries";
import { CreateUserForm } from "../components/sections/user/CreateUserForm";

export default function UsersPage() {
  const { loading, error, data } = useQuery(GET_USERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <h1>Users</h1>
      <p>This is the users page.</p>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.users.map((user: { id: string; email: string }) => (
          <UserCard key={user.id} user={user} />
        ))}
      </ul>

      <CreateUserForm />
    </div>
  );
}
