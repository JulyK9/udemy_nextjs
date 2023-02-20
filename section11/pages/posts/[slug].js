import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostFiles } from "../../lib/post-util";

const PostDetailPage = (props) => {
  return <PostContent post={props.post} />;
  // return <div>PostDetailPage</div>;
};

export function getStaticProps(context) {
  const { params } = context; // params 로 구체적인 slug 값을 추출해냄 (동적 세그먼트)
  const { slug } = params;
  const postData = getPostData(slug);

  console.log("postData: ", postData);

  return {
    props: { post: postData },
    // 유효성 재검사를 모든 게시물에 적용하지 않고 단일 게시물 데이터를 페칭하면 더 빠를 것으로 생각해 볼 수 있음
    // 쉽게 생각해서 마크다운 오타를 하나 수정하려고 전체를 재구축 하는 것을 피하는 것
    revalidate: 600,
  };
}

// 동적 페이지로 미리 생성하는 모든 경로의 slug가 구체적인 값을 갖도록 설정
// 각 게시물의 단일 게시물 페이지를 사전 생성하도록 해줌
export function getStaticPaths() {
  const postFileNames = getPostFiles();
  // console.log("postFileNames: ", postFileNames);

  const slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, "")); // 확장자를 제거한 경로 이름을 요소로 하는 배열
  // console.log("slugs: ", slugs);

  return {
    // paths: [{ params: { slug: "" } }],
    // paths: [],
    paths: slugs.map((slug) => ({ params: { slug: slug } })), // 중괄호를 넣어서 즉시 반환되는 객체로 만들어줌(경로 객체 배열이 생성됨)
    fallback: false, // 수십 수백개 정도의 포스팅은 모든 페이지 렌더링 작업이 그리 어려운게 아니므로 fallback을 false로 하여 모든 경로를 명시적으로 정의
    // fallback: true, // fallback 컨텐츠가 뜨도록 설정

    // 게시물이 뜰때까지 기다리도록 설정, 게시물이 매우 많다면 대부분 게시물의 방문 빈도가 높지 않을 것이므로 이 방법을 고려해볼 수 있음
    // 모든 게시물을 미리 생성해둘 필요가 없기 때문
    // fallback: "blocking",
  };
}

export default PostDetailPage;
