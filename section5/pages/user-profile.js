const UserProfilePage = (props) => {
  return <h1>{props.username}</h1>;
};

export default UserProfilePage;

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  // console.log(req);
  // console.log(res);

  // build 모드를 통해서 서버사이드에서(터미널) 출력은 되지만 페이지는 사전생성된 것이 아님을 알 수 있음
  console.log("server side code test");

  return {
    props: {
      username: "Max",
    },
  };
}
