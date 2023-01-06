import router, { useRouter } from "next/router";

const PortfolioProjectPage = () => {
  const router = useRouter();

  console.log("router.pathname: ", router.pathname);
  console.log("router.query: ", router.query);
  console.log("router.query.: ", router.query.projectid);

  // send a request to some backend server
  // to fetch the piece of data with an id of router.query.projectid

  return (
    <div>
      <h1>The Portfolio Project Page</h1>
    </div>
  );
};

export default PortfolioProjectPage;
