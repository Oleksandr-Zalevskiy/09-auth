"use client";

import { useEffect, useId, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createNote } from "../../lib/api/clientApi";
import { useNoteStore, initialDraft } from "../../lib/store/noteStore";
import type { NoteTag } from "../../types/note";

import css from "./NoteForm.module.css";

type FormValues = {
  title: string;
  content: string;
  tag: NoteTag;
};

const TAGS: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const titleId = useId();
  const contentId = useId();
  const tagId = useId();

  const draft = useNoteStore((s) => s.draft);
  const setDraft = useNoteStore((s) => s.setDraft);
  const clearDraft = useNoteStore((s) => s.clearDraft);

  const [values, setValues] = useState<FormValues>(initialDraft);
  const [error, setError] = useState("");

  useEffect(() => {
    setValues(draft ?? initialDraft);
  }, [draft]);

  const mutation = useMutation({
    mutationFn: async (payload: FormValues) => {
      return createNote({
        title: payload.title.trim(),
        content: payload.content.trim(),
        tag: payload.tag,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.back();
    },
    onError: () => {
      setError("Failed to create note. Please try again.");
    },
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setValues((prev) => ({ ...prev, title }));
    setDraft({ title });
    if (error) setError("");
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    setValues((prev) => ({ ...prev, content }));
    setDraft({ content });
    if (error) setError("");
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tag = e.target.value as NoteTag;
    setValues((prev) => ({ ...prev, tag }));
    setDraft({ tag });
    if (error) setError("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = values.title.trim();
    const content = values.content.trim();

    if (!title || !content) {
      setError("Title and content are required.");
      return;
    }

    mutation.mutate(values);
  };

  const handleCancel = () => router.back();

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label className={css.label} htmlFor={titleId}>
          Title
        </label>
        <input
          id={titleId}
          className={css.input}
          type="text"
          name="title"
          value={values.title}
          onChange={handleTitleChange}
          autoComplete="off"
        />
      </div>

      <div className={css.formGroup}>
        <label className={css.label} htmlFor={contentId}>
          Content
        </label>
        <textarea
          id={contentId}
          className={css.textarea}
          name="content"
          value={values.content}
          onChange={handleContentChange}
          rows={6}
        />
      </div>

      <div className={css.formGroup}>
        <label className={css.label} htmlFor={tagId}>
          Tag
        </label>
        <select
          id={tagId}
          className={css.select}
          name="tag"
          value={values.tag}
          onChange={handleTagChange}>
          {TAGS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {error && <p className={css.error}>{error}</p>}

      <div className={css.actions}>
        <button
          className={css.submitBtn}
          type="submit"
          disabled={mutation.isPending}>
          {mutation.isPending ? "Creating..." : "Create"}
        </button>

        <button className={css.cancelBtn} type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
