import { useRouter } from "next/router";

const ClientProjectPage = () => {
  const router = useRouter();

  console.log(router.query); // 해당 경로까지의 쿼리에 접근할 수 있음

  const loadProjectHandler = () => {
    // load data..etc
    // router.push 메서드로 Link의 기능을 함수화해서 사용할 수 있음
    // router.push("/clients/max/projecta");
    // router.push(`/clients/${router.query.id}/projecta`);
    router.push({
      pathname: "/clients/[id]/[clientprojectid]",
      query: { id: router.query.id, clientprojectid: "projecta" },
    });
    // replace 메서드는 현재페이지를 대체할 때(이전 페이지로 돌아갈 수 없음)
    // router.replace(`/clients/${router.query.id}/projecta`);
  };

  return (
    <div>
      <h1>The Project of Given Client</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
};

export default ClientProjectPage;
