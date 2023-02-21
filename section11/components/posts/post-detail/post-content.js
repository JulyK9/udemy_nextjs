import ReactMarkdown from "react-markdown";
import classes from "./post-content.module.css";
import PostHeader from "./post-header";

import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

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
  const customRenderes = {
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

    code(code) {
      // const { language, value } = code; // 예전 방식
      // console.log(code); // 콘솔에서 code로 전달되는 객체를 확인해볼 수 있음
      const { className, children } = code;
      const language = className.split("-")[1];
      // className is something like is 'language-js' => so need the 'js' part here
      return (
        <SyntaxHighlighter
          style={atomDark}
          language={language}
          children={children}
        />
      );
    },
  };

  return (
    <article className={classes.content}>
      {/* <PostHeader title={DUMMY_POST.title} image={DUMMY_POST.imagePath} /> */}
      <PostHeader title={post.title} image={imagePath} />
      {/* <p>{DUMMY_POST.content}</p> */}
      {/* <ReactMarkdown>{DUMMY_POST.content}</ReactMarkdown> */}
      <ReactMarkdown components={customRenderes}>{post.content}</ReactMarkdown>
    </article>
  );
};

export default PostContent;
