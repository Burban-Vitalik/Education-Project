// lib/graphql/mutations.ts
import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      id
      email
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: String!) {
    removeUser(id: $id) {
      id
      email
    }
  }
`;
