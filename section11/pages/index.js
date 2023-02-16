import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";

const HomePage = () => {
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

  return (
    <>
      <Hero />
      {/* <FeaturedPosts /> */}
      {/* getStaticProps 를 통해 데이터를 가져와서 props로 하위 컴포넌트에 전달 */}
      <FeaturedPosts posts={DUMMY_POSTS} />
    </>
  );
};

export default HomePage;
