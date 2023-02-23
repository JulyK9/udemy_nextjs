import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/post-util";
import Head from "next/head";

const AllPostsPage = (props) => {
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

  // return <AllPosts posts={DUMMY_POSTS} />;
  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta
          name="description"
          content="A list of all programming-related tutorials and posts!"
        />
      </Head>
      <AllPosts posts={props.allPosts} />
    </>
  );
};

export function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: {
      allPosts: allPosts,
    },
    // revalidate: 1800; // 새 게시물을 작성하면 전체 project 폴더의 일부로서 재배포가 필수이기 때문에 여기서는 따로 추가하지 않음
  };
}

export default AllPostsPage;
