import Link from "next/dist/client/link";
import Image from "next/image";
import classes from "./post-item.module.css";

const PostItem = (props) => {
  const { title, image, excerpt, date, slug } = props.post;
  // slug 는 게시물로 가는 고유 경로로 식별자 역할

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const imagePath = `/image/posts/${slug}/${image}`;

  return (
    <li className={classes.post}>
      <Link>
        <a>
          <div className={classes.image}>
            <Image src={imagePath} alt={title} width={300} height={200} />
          </div>
          <div className={classes.content}>
            {/* <h3>TITLE</h3> */}
            <h3>{title}</h3>
            {/* <time>July 11th 2022</time> */}
            <time>{formattedDate}</time>
            {/* <p>The excerpt</p> */}
            <p>{excerpt}</p>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default PostItem;
