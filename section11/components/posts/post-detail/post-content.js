import ReactMarkdown from "react-markdown";
import classes from "./post-content.module.css";
import PostHeader from "./post-header";

import Image from "next/image";

// const DUMMY_POST = {
//   title: "Getting Started with NextJS",
//   image: "getting-started-nextjs.png",
//   content: "# This is a first ",
//   date: "2023-02-15",
//   slug: "getting-started-with-nextjs1",
// };

const PostContent = (props) => {
  const { post } = props;
  // console.log("post: ", post);

  // const imagePath = `/images/posts/${DUMMY_POST.slug}/${DUMMY_POST.image}`;
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  // 커스텀한 렌더러 오브젝트를 오버라이드 하기 위해 만들어줌
  const cumstomRenderes = {
    // img(image) {
    //   return (
    //     <Image
    //       src={`/images/posts/${post.slug}/${image.src}`}
    //       alt={image.alt}
    //       width={600}
    //       height={300}
    //     />
    //   );
    // },

    // 단락 내에 렌더링할 이미지가 있는 부분만 오버라이드하고 다른 단락은 그대로 두는 방법
    p(paragraph) {
      const { node } = paragraph;
      // 렌더링하려는 이미지가 해당 단락의 직접 자식 노드인지 확인
      if (node.children[0].tagName === "img") {
        const image = node.children[0];

        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={image.properties.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }

      return <p>{paragraph.children}</p>;
    },
  };

  return (
    <article className={classes.content}>
      {/* <PostHeader title={DUMMY_POST.title} image={DUMMY_POST.imagePath} /> */}
      <PostHeader title={post.title} image={imagePath} />
      {/* <p>{DUMMY_POST.content}</p> */}
      {/* <ReactMarkdown>{DUMMY_POST.content}</ReactMarkdown> */}
      <ReactMarkdown components={cumstomRenderes}>{post.content}</ReactMarkdown>
    </article>
  );
};

export default PostContent;
