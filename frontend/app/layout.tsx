"use client";
import { ApolloProvider } from "@apollo/client";
import "./globals.css";
import client from "../lib/auth/apolloClient";
// import { useAuthRedirect } from "../hooks/useAuthRedirect";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // useAuthRedirect();

  return (
    <html lang="en">
      <body>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </body>
    </html>
  );
}

