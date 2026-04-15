// app/layout.tsx
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "JoyFactory | Zones of Pure Joy",
  description: "Sophisticated indoor playground for kids 3-12",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider afterSignOutUrl="/">   {/* ← add this line */}
      <html lang="en" className="light">
        <head>
          {/* Google Fonts + Material Symbols (unchanged) */}
          <link
            href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&amp;family=Be+Vietnam+Pro:ital,wght@0,100..900;1,100..900&amp;display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="bg-background text-on-surface font-body selection:bg-secondary-container selection:text-on-secondary-container">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}