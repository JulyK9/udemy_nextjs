import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <h1>The Home Page</h1>
      <ul>
        <li>
          {/* <a href="/portfolio">Portfolio</a> */}
          <Link href="/portfolio">Portfolio</Link>
          {/* <Link replace href="/portfolio">Portfolio</Link> */}
        </li>
        <li>
          <Link href="/clients">Clients</Link>
        </li>
      </ul>
    </div>
  );
};

export default HomePage;
