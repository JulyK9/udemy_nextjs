import fs from "fs";
import path from "path";

import matter from "gray-matter";

// join 메서드로 탐색할 파일의 절대경로 생성
// joins(process.cwd()) 는 루트(프로젝트) 폴더를 가리킴
// 다음 인자로는 그 이하에서 탐색할 경로
const postsDirectory = path.join(process.cwd(), "lib");

export function getPostData(fileName) {
  // 확보한 파일의 절대경로에 파일 이름까지 합쳐서 해당 파일에 대한 전체 절대경로 확보
  const filePath = path.join(postsDirectory, fileName);
  const fileContent = fs.readFileSync(filePath, "utf-8"); // 모든 유니코드 문자를 지원할 수 있도록 UTF-8로 부호화

  const { data, content } = matter(fileContent);

  const postSlug = fileName.replace(/\.md$/, ""); // 확장자를 제거(파읾여만 남기기)

  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
}

export function getAllPosts() {
  // 모든 콘텐츠를 동기식으로 읽음 => 디렉토리의 전체 콘텐츠를 한번에 읽어들이도록 함
  // readdirSync 메서드의 리턴값이 문자열을 요소로 하는 배열의 형태이므로
  const postFiles = fs.readdirSync(postsDirectory);

  // 반복문으로 모든 파일(배열의 모든 요소)를 탐색하여 postData를 얻도록 함(배열 요소 탐색이므로 for of)
  // for (const postFile of postFiles) {
  //   const postData = getPostData(postFile);
  // }

  // postData는 배열인데 객체 요소의 배열로 바꿔주기 위해
  // fileNames 배열을 여러 게시물에 대한 실제 데이터 객체 배열로 매핑해줄 수 있음
  // map 메서드를 통해 기존 배열을 바꾸지 않고 새롭게 객체 형태의 배열을 생성
  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  // 최신 게시물이 먼저 오도록 정렬
  // postA의 날짜가 postB 날짜보다 이후인지 확인(큰게 더 나중)
  // 이후 날짜 게시물(더 최신 게시물)이 먼저 표시되도록 설정
  sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  return sortedPosts;
}

// 모든 featured post를 다루는 헬퍼 함수
export function getFeaturedPosts() {
  const allPosts = getAllPosts();

  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
}

// 로직상 모든 포스트를 가져오고나서 featured post를 가져오고 있음
// 만일 바로 featured post만 가져오려면 데이터 소스를 별도로 두어야 함
// 이는 게시물이 데이터가 매우 많은 경우 성능 개선을 위해 고려해볼 일이지만 현재는 그런 상황이 아니므로 위와 같은 로직으로 진행
