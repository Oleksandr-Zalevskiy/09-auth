import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
const OG_IMAGE = "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

export const metadata: Metadata = {
  title: "404 | NoteHub",
  description: "Page not found. This page does not exist in NoteHub.",
  openGraph: {
    title: "404 | NoteHub",
    description: "Page not found. This page does not exist in NoteHub.",
    url: `${SITE_URL}/not-found`,
    images: [{ url: OG_IMAGE }],
  },
};

export default function NotFound() {
  return <h1>404 - Page not found</h1>;
}
