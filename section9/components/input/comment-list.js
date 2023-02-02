import classes from "./comment-list.module.css";

function CommentList(props) {
  const { items } = props;
  console.log(items);

  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {items.map((item) => (
        <li key={item._id}>
          <p>{item.text}</p>
          <div>
            By <address>{item.name}</address>
          </div>
        </li>
      ))}
      {/* <li>
        <p>My comment is amazing!</p>
        <p>{items.text}</p>
        <div>
          By <address>Maximilian</address>
          By <address>{items.name}</address>
        </div>
      </li>
      <li>
        <p>My comment is amazing!</p>
        <div>
          By <address>Maximilian</address>
        </div>
      </li> */}
    </ul>
  );
}

export default CommentList;
