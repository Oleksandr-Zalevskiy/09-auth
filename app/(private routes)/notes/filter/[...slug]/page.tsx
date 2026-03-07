import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { Metadata } from "next";

import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const OG_IMAGE = "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

interface Props {
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0] ?? "all";

  const title = `Notes | ${tag}`;
  const description = `Notes list filtered by: ${tag}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/notes/filter/${tag}`,
      images: [{ url: OG_IMAGE }],
    },
  };
}

export default async function FilterPage({ params }: Props) {
  const { slug } = await params;

  const initialTag = slug?.[0] ?? "all";
  const tag = initialTag === "all" ? undefined : initialTag;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () => fetchNotes(1, "", tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={initialTag} />
    </HydrationBoundary>
  );
}
