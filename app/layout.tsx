import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FinHealth360 — AI Financial Health Platform for Indians",
  description: "Get your Financial Health Score in 2 minutes. AI-powered insights specific to your income, goals and investments.",
  openGraph: {
    title: "FinHealth360 — AI Financial Health Platform",
    description: "Free Financial Health Score + AI Agent for Indian investors.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
