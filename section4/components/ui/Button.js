import Link from "next/link";
import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <>
      {props.link ? (
        <Link href={props.link}>
          <a className={classes.btn}>{props.children}</a>
        </Link>
      ) : (
        <button className={classes.btn} onClick={props.onClick}>
          {props.children}
        </button>
      )}
    </>
  );
};

export default Button;
