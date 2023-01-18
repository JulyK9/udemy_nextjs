import { useEffect, useState } from "react";
import useSWR from "swr";

const LastSalesPage = (props) => {
  // getStaticProps 로부터 서버에서 받은 혹은 빌드 프로세스 중에 사전 렌더링된 이 sales가
  // 바로 초기 상태로 사용되는 sales이며
  const [sales, setSales] = useState(props.sales);
  // const [isLoading, setIsLoading] = useState(false);

  // 클라이언트 사이드 데이터 페칭의 결과를 덮어쓰게 될 것
  const fetcher = (url) => fetch(url).then((r) => r.json());

  const { data, error } = useSWR(
    "https://nextjs-course-e6529-default-rtdb.firebaseio.com/sales.json",
    fetcher
  );

  // useEffect를 요청을 보내는 데에 사용하지 않고 데이터 변환하는 것에만 사용
  useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales);
    }
  }, [data]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("https://nextjs-course-e6529-default-rtdb.firebaseio.com/sales.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // 객체 형태의 sales 데이터를 배열로 변경
  //       const transformedSales = [];

  //       for (const key in data) {
  //         transformedSales.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume,
  //         });
  //       }

  //       setSales(transformedSales);
  //       setIsLoading(false);
  //     });
  // }, []);

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  if (error) {
    return <p>Failed to load</p>;
  }

  // if (!data || !sales) {
  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  // if (!sales) {
  //   return <p>No data yet</p>;
  // }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
};

export async function getStaticProps() {
  // 모든 단계 및 최종 데이터를 가지는 전체 프로미스가 getStaticProps로 반환되도록 전체 프로미스 체인을 return

  const response = await fetch(
    "https://nextjs-course-e6529-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await response.json();

  // 객체 형태의 sales 데이터를 배열로 변경
  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }
  // async 비동기 함수이므로 promise 객체가 리턴되는 2번째 then 블록 안에서 객체를 return 해야함
  return {
    // props: { sales: transformedSales, revalidate: 10 },
    props: { sales: transformedSales },
  };
}

export default LastSalesPage;
