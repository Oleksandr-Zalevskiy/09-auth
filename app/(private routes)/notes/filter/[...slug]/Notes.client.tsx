"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";

import css from "./Notes.client.module.css";

interface NotesClientProps {
  initialTag: string; // "all" | "Todo" | "Work" ...
}

export default function NotesClient({ initialTag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const tag = initialTag === "all" ? undefined : initialTag;

  useEffect(() => {
    setPage(1);
    setSearch("");
  }, [initialTag]);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["notes", page, search, tag],
    queryFn: () => fetchNotes(page, search, tag),
    placeholderData: keepPreviousData,
  });

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearch} />

        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        )}

        <Link className={css.button} href="/notes/action/create">
          Create note +
        </Link>
      </header>

      <main>
        {isLoading ? (
          <p className={css.statusMessage}>Loading notes...</p>
        ) : data && data.notes.length > 0 ? (
          <>
            {isFetching && <p className={css.statusMessage}>Updating...</p>}
            <NoteList notes={data.notes} />
          </>
        ) : (
          <p className={css.statusMessage}>No notes found</p>
        )}
      </main>
    </div>
  );
}
