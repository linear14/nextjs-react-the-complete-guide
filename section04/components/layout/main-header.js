import Link from "next/link";
import css from "./main-header.module.css";

function MainHeader() {
  return (
    <header className={css.header}>
      <div className={css.logo}>
        <Link href="/">NextEvents</Link>
      </div>
      <nav className={css.navigation}>
        <ul>
          <li>
            <Link href="/events">Browse All Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
