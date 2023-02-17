import classes from "./post-content.module.css";
import PostHeader from "./post-header";

const DUMMY_POST = {
  title: "Getting Started with NextJS",
  image: "getting-started-nextjs.png",
  content: "# This is a first ",
  date: "2023-02-15",
  slug: "getting-started-with-nextjs1",
};

const PostContent = () => {
  const imagePath = `/images/posts/${DUMMY_POST.slug}/${DUMMY_POST.image}`;

  return (
    <article className={classes.content}>
      <PostHeader title={DUMMY_POST.title} image={imagePath} />
      <p>{DUMMY_POST.content}</p>
    </article>
  );
};

export default PostContent;
