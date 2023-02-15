import Image from "next/image";
import classes from "./hero.module.css";

const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        {/* <Image src="/section11/public/images/site/latte-art.jpg" alt="An image showing me" width={ } height={ } /> */}
        <Image
          src="/images/site/latte-art.jpg"
          alt="An image showing me"
          width={300}
          height={300}
        />
      </div>
      <h1>Hello, I'm JK</h1>
      <p>I blog about web frontend development</p>
    </section>
  );
};

export default Hero;
