import fs from "fs";
import path from "path";

// join 메서드로 절대경로 생성
// joins(process.cwd()) 는 루트(프로젝트) 폴더를 가리킴
// 다음 인자로는 그 이하에서 탐색할 경로
const postsDirectory = path.join(process.cwd(), "lib");

export function getAllPosts() {
  // 모든 콘텐츠를 동기식으로 읽음 => 디렉토리의 전체 콘텐츠를 한번에 읽어들이도록 함
  fs.readdirSync();
}
