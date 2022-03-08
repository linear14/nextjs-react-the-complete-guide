import Link from "next/link";
import css from "./Button.module.css";

function Button(props) {
  if (props.link) {
    return (
      <Link href={props.link}>
        <a className={css.btn}>{props.children}</a>
      </Link>
    );
  } else {
    return (
      <button className={css.btn} onClick={props.onClick}>
        {props.children}
      </button>
    );
  }
}

export default Button;
