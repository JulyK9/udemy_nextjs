import AllPosts from "../../components/posts/all-posts";

const AllPostsPage = () => {
  const DUMMY_POSTS = [
    {
      title: "Getting Started with NextJS",
      image: "getting-started-nextjs.png",
      excerpt:
        "NextJS is a React framework for production - it makes building fullstack React apps and sites a breeze and ships with build-in SSR",
      date: "2023-02-15",
      slug: "getting-started-with-nextjs1",
    },
    {
      title: "Getting Started with NextJS",
      image: "getting-started-nextjs.png",
      excerpt:
        "NextJS is a React framework for production - it makes building fullstack React apps and sites a breeze and ships with build-in SSR",
      date: "2023-02-15",
      slug: "getting-started-with-nextjs2",
    },
    {
      title: "Getting Started with NextJS",
      image: "getting-started-nextjs.png",
      excerpt:
        "NextJS is a React framework for production - it makes building fullstack React apps and sites a breeze and ships with build-in SSR",
      date: "2023-02-15",
      slug: "getting-started-with-nextjs3",
    },
    {
      title: "Getting Started with NextJS",
      image: "getting-started-nextjs.png",
      excerpt:
        "NextJS is a React framework for production - it makes building fullstack React apps and sites a breeze and ships with build-in SSR",
      date: "2023-02-15",
      slug: "getting-started-with-nextjs4",
    },
  ]; // 더미 게시물 객체들의 배열

  return <AllPosts posts={DUMMY_POSTS} />;
};

export default AllPostsPage;
