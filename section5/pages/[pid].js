import fs from "fs/promises";
import path from "path";

const ProductDetailPage = (props) => {
  const { loadedproduct } = props;

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
  const product = data.products.map((product) => product.id === productId);

  // props를 통해 컴포넌트에 전달하여 사용
  return {
    props: {
      loadedproduct: product,
    },
  };
}

export default ProductDetailPage;
