import path from "path";
import fs from "fs/promises";

function HomePage(props) {
  const { products } = props;
  // console.log(products);

  return (
    <ul>
      {/* <li>Product 1</li>
      <li>Product 2</li>
      <li>Product 3</li> */}
      {products.map((product) => {
        return <li key={product.id}>{product.title}</li>;
      })}
    </ul>
  );
}

// Next.js가 이 컴포넌트 페이지를 사전 렌더링하기 전 데이터를 프리페치해야하므로 getStaticProps 함수 사용
// 쉽게말해서 이 컴포넌트를 실행하기 전에 getStaticProps 함수 부분을 먼저 실행함
export async function getStaticProps() {
  console.log("(Re-)Generating..."); // 서버 사이드쪽이므로 터미널에 콘솔이 표시되는 걸 확인할 수 있음
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json"); // process.cwd() 는 현재 작업 디렉토리(프로젝트의 루트 디렉토리임에 유의!)
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  // 이 함수는 항상 props를 key로 가지는 객체를 반환해야 함
  return {
    props: {
      products: data.products,
    },
    // props: { products: [{ id: "p1", title: "product 1" }]},
    revalidate: 10,
  };
}

export default HomePage;
