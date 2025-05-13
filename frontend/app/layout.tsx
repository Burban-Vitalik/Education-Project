"use client";
import { ApolloProvider } from "@apollo/client";
import "./globals.css";
import client from "../lib/auth/apolloClient";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </body>
    </html>
  );
}

