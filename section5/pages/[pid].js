import fs from "fs/promises";
import path from "path";

const ProductDetailPage = (props) => {
  const { loadedproduct } = props;

  // fallback 기능을 true 작동시키면 fallback 상태를 반환할 수 있게 해줘야 함
  // if (!loadedproduct) {
  //   return <p>Loading...</p>;
  // }
  // fallback 반환 확인을 할 필요가 없을 때는 지워줌

  return (
    <>
      <h1>{loadedproduct.title}</h1>
      <p>{loadedproduct.description}</p>
    </>
  );
};

export async function getStaticProps(context) {
  // getStaticProps 함수 안에서 context 매개변수를 통해 동적 경로 세그먼트에 접근하여 id 추출
  const { params } = context;
  const productId = params.pid;

  // 로컬에서 특정 데이터 페칭
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  // 추출한 id로 product 필터링
  const product = data.products.find((product) => product.id === productId);

  // props를 통해 컴포넌트에 전달하여 사용
  return {
    props: {
      loadedproduct: product,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { pid: "p1" } },
      // { params: { pid: "p2" } }, // fallback true로 인해 추가하지 않아도 로딩은 됨(다만 사전 생성되는건 아님)
      // { params: { pid: "p3" } },
    ],
    // fallback: true, // 일부 페이지만 사전 렌더링 하는 속성
    fallback: blocking, // 에러가 나진 않지만 계속 기다려서 페이지를 온전하게 보여주게 하고 싶은 경우
  };
}

export default ProductDetailPage;
