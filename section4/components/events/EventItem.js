import Link from "next/link";
import classes from "./EventItem.module.css";
// import styles from './EventItem.module.css'
import Button from "../ui/Button";

const EventItem = (props) => {
  const { title, image, date, location, id } = props;

  const easyToReadDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAddress = location.replace(", ", "\n");

  const exploreLink = `/events/${id}`;

  return (
    <li className={classes.item}>
      <img src={"/" + image} alt={title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <time>{easyToReadDate}</time>
          </div>
          <div className={classes.address}>
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Link href={exploreLink}>
            <Button link={exploreLink}>Explore Event</Button>
          </Link>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
