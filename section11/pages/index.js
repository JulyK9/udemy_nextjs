import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";
import { getFeaturedPosts } from "../lib/post-util";

const HomePage = (props) => {
  // const DUMMY_POSTS = [
  //   {
  //     title: "Getting Started with NextJS",
  //     image: "getting-started-nextjs.png",
  //     excerpt:
  //       "NextJS is a React framework for production - it makes building fullstack React apps and sites a breeze and ships with build-in SSR",
  //     date: "2023-02-15",
  //     slug: "getting-started-with-nextjs1",
  //   },
  //   {
  //     title: "Getting Started with NextJS",
  //     image: "getting-started-nextjs.png",
  //     excerpt:
  //       "NextJS is a React framework for production - it makes building fullstack React apps and sites a breeze and ships with build-in SSR",
  //     date: "2023-02-15",
  //     slug: "getting-started-with-nextjs2",
  //   },
  //   {
  //     title: "Getting Started with NextJS",
  //     image: "getting-started-nextjs.png",
  //     excerpt:
  //       "NextJS is a React framework for production - it makes building fullstack React apps and sites a breeze and ships with build-in SSR",
  //     date: "2023-02-15",
  //     slug: "getting-started-with-nextjs3",
  //   },
  //   {
  //     title: "Getting Started with NextJS",
  //     image: "getting-started-nextjs.png",
  //     excerpt:
  //       "NextJS is a React framework for production - it makes building fullstack React apps and sites a breeze and ships with build-in SSR",
  //     date: "2023-02-15",
  //     slug: "getting-started-with-nextjs4",
  //   },
  // ]; // 더미 게시물 객체들의 배열

  const { posts } = props;

  return (
    <>
      <Hero />
      {/* <FeaturedPosts /> */}
      {/* getStaticProps 를 통해 데이터를 가져와서 props로 하위 컴포넌트에 전달 */}
      {/* <FeaturedPosts posts={DUMMY_POSTS} /> */}
      <FeaturedPosts posts={posts} />
    </>
  );
};

// 블로그 게시물은 바뀔일이 많지 않고 유저와의 상호작용이 별로 없기 때문에
// 매 요청마다 모든 파일과 게시물을 불러오는 getServerSideProps를 사용하는 것은 비효율적인 처리 방법

// 대부분의 게시물에 대한 변경이 없을 것이므로 getStaticProps가 적절한 방법

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  // console.log("featuredPosts: ", featuredPosts);

  return {
    props: {
      posts: featuredPosts,
    },
    // revalidate: 1800,
  };
}

export default HomePage;
