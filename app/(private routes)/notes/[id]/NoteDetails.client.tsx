import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import NotesClient from "./Notes.client";
import { fetchNotes } from "../../../../../lib/api/serverApi";
import type { NoteTag } from "../../../../../types/note";

const SITE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
const OG_IMAGE = "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

interface Props {
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const currentTag = slug?.[0] ?? "all";

  return {
    title: `Notes | ${currentTag}`,
    description: `Browse your notes filtered by ${currentTag}.`,
    openGraph: {
      title: `Notes | ${currentTag}`,
      description: `Browse your notes filtered by ${currentTag}.`,
      url: `${SITE_URL}/notes/filter/${currentTag}`,
      images: [{ url: OG_IMAGE }],
    },
  };
}

export default async function FilterPage({ params }: Props) {
  const { slug } = await params;

  const initialTag = slug?.[0] ?? "all";
  const tag = initialTag === "all" ? undefined : (initialTag as NoteTag);

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
