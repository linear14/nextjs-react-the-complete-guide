import Link from "next/link";
import css from "./Button.module.css";

function Button(props) {
  return (
    <Link href={props.link}>
      <a className={css.btn}>{props.children}</a>
    </Link>
  );
}

export default Button;
