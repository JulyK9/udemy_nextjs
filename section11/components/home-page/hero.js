import classes from "./hero.module.css";

const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>Image</div>
      <h1>Hello, I'm JK</h1>
      <p>I blog about web frontend development</p>
    </section>
  );
};

export default Hero;
