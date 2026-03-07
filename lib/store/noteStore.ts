import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NoteTag } from "@/types/note";

interface DraftData {
  title: string;
  content: string;
  tag: NoteTag;
}

const initialDraft: DraftData = {
  title: "",
  content: "",
  tag: "Todo",
};

interface NoteStore {
  draft: DraftData;
  setDraft: (note: Partial<DraftData>) => void;
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
      name: "note-draft-storage",
    },
  ),
);
