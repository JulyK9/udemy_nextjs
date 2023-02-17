import fs from "fs";
import path from "path";

// join 메서드로 탐색할 파일의 절대경로 생성
// joins(process.cwd()) 는 루트(프로젝트) 폴더를 가리킴
// 다음 인자로는 그 이하에서 탐색할 경로
const postsDirectory = path.join(process.cwd(), "lib");

function getPostData(fileName) {
  // 확보한 파일의 절대경로에 파일 이름까지 합쳐서 해당 파일에 대한 전체 절대경로 확보
  const filePath = path.join(postsDirectory, fileName);
  const fileContent = fs.readFileSync(filePath, "utf-8"); // 모든 유니코드 문자를 지원할 수 있도록 UTF-8로 부호화
}

export function getAllPosts() {
  // 모든 콘텐츠를 동기식으로 읽음 => 디렉토리의 전체 콘텐츠를 한번에 읽어들이도록 함
  const postFiles = fs.readdirSync(postsDirectory);
}
