import { createNote } from "@/lib/api/clientApi";
import css from "./NoteCard.module.css";
import { Note } from "@/types/note";

interface NoteCardProps {
  note: Note;
}

const NoteCard = ({ note }: NoteCardProps) => {
  return (
    <div className={css.card}>
      <div className={css.content}>
        <div className={css.tagWrapper}>
          <span className={css.tag}>{note.tag}</span>
        </div>
        <h3 className={css.title}>{note.title}</h3>
        <p className={css.description}>{note.content || "No content"}</p>
      </div>

      <div className={css.footer}>
        <button className={css.viewDetailsBtn}>View details</button>
        <button className={css.deleteBtn}>Delete</button>
      </div>
    </div>
  );
};

export default NoteCard;
