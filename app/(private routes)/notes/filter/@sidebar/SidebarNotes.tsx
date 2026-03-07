"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./SidebarNotes.module.css";

const TAGS = ["all", "Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function SidebarNotes() {
  const pathname = usePathname();

  const isActive = (tag: string) => {
    if (tag === "all") return pathname === "/notes/filter/all";
    return pathname === `/notes/filter/${tag}`;
  };

  return (
    <ul className={css.menuList}>
      {TAGS.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link
            href={`/notes/filter/${tag}`}
            className={`${css.menuLink} ${isActive(tag) ? css.active : ""}`}>
            {tag === "all" ? "All notes" : tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
