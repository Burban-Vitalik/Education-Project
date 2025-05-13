import { useMutation } from "@apollo/client";
import { FC } from "react";
import { DELETE_USER } from "../../lib/graphql/mutations";

type PropsType = {
  user: { id: string; email: string };
};

export const UserCard: FC<PropsType> = ({ user }) => {
  const [removeUser] = useMutation(DELETE_USER);
  return (
    <div className="flex] flex-col items-center justify-center p-4 border rounded shadow-md">
      <div className="text-lg font-bold">{user.id}</div>
      <div>Email: {user.email}</div>

      <button
        className="border p-1 rounded-md bg-red-500 text-white"
        onClick={() => removeUser({ variables: { id: user.id } })}
      >
        Delete
      </button>
    </div>
  );
};
