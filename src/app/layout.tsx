import type { Metadata } from "next";
import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ClientThemeProvider from "../components/ClientThemeProvider";
import theme from "../theme";

export const metadata: Metadata = {
  title: "MyCoa",
  description: "Mercoa interview project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClientThemeProvider>
        <body>{children}</body>
      </ClientThemeProvider>
    </html>
  );
}
