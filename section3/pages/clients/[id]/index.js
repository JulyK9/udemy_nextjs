import { useRouter } from "next/router";

const ClientProjectPage = () => {
  const router = useRouter();

  console.log(router.query); // 해당 경로까지의 쿼리에 접근할 수 있음

  return (
    <div>
      <h1>The Project of Given Client</h1>
    </div>
  );
};

export default ClientProjectPage;
