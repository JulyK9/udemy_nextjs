import ReactMarkdown from "react-markdown";
import classes from "./post-content.module.css";
import PostHeader from "./post-header";

// const DUMMY_POST = {
//   title: "Getting Started with NextJS",
//   image: "getting-started-nextjs.png",
//   content: "# This is a first ",
//   date: "2023-02-15",
//   slug: "getting-started-with-nextjs1",
// };

const PostContent = (props) => {
  const { post } = props;
  // console.log("post: ", post);

  // const imagePath = `/images/posts/${DUMMY_POST.slug}/${DUMMY_POST.image}`;
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  return (
    <article className={classes.content}>
      {/* <PostHeader title={DUMMY_POST.title} image={DUMMY_POST.imagePath} /> */}
      <PostHeader title={post.title} image={imagePath} />
      {/* <p>{DUMMY_POST.content}</p> */}
      {/* <ReactMarkdown>{DUMMY_POST.content}</ReactMarkdown> */}
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </article>
  );
};

export default PostContent;
