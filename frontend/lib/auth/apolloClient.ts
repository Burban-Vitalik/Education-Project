// frontend/lib/apolloClient.ts
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4200/graphql", // ⚠️ заміни на свій бекенд-порт
  cache: new InMemoryCache(),
  credentials: "include", // Додано для підтримки куків
});

export default client;
