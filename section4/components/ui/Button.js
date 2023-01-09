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
        // 자동으로 버튼을 누르도록 onClick 실행
        <button className={classes.btn} onClick={props.onClick}>
          {props.children}
        </button>
      )}
    </>
  );
};

export default Button;
