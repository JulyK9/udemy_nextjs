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
  // 이 함수는 항상 props를 key로 가지는 객체를 반환해야 함
  return {
    props: {
      products: [{ id: "p1", title: "product 1" }],
    },
  };
}

export default HomePage;