import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NoteTag } from "../../types/note";

export const initialDraft: {
  title: string;
  content: string;
  tag: NoteTag;
} = {
  title: "",
  content: "",
  tag: "Todo",
};

type Draft = typeof initialDraft;

interface NoteStore {
  draft: Draft;
  setDraft: (note: Partial<Draft>) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) =>
        set((state) => ({
          draft: { ...state.draft, ...note },
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft",
    },
  ),
);
