import PostItem from "./post-item";
import classes from "./posts-grid.module.css";

const PostGrid = (props) => {
  const { posts } = props;
  // 일반적으로 객체를 요소로 하는 배열로 자료 구조가 되어있으니까

  // console.log("posts: ", posts);

  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  );
};

export default PostGrid;
