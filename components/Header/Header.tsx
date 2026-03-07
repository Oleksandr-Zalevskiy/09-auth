import Link from "next/link";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import css from "./Header.module.css";

export default function Header() {
  return (
    <header className={css.header}>
      <nav className={css.navigation}>
        <Link href="/" className={css.logo}>
          NoteHub
        </Link>

        <ul className={css.navigationList}>
          <li className={css.navigationItem}>
            <Link href="/" className={css.navigationLink}>
              Home
            </Link>
          </li>

          <li className={css.navigationItem}>
            <Link href="/notes/filter/all" className={css.navigationLink}>
              Notes
            </Link>
          </li>

          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}
