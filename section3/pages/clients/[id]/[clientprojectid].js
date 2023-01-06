import { useRouter } from "next/router";

const SelectedClientProjectPage = () => {
  const router = useRouter();

  console.log(router.query); // 각각의 동적 경로의 쿼리에 모두 접근할 수 있음

  return (
    <div>
      <h1>The Project Page for a Specific Project for a Selected Client</h1>
    </div>
  );
};

export default SelectedClientProjectPage;
