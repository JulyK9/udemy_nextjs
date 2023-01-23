import Document, { Html, Head, Main, NextScript } from "next/document";

// html 내용을 오버라이딩 함
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <div id="overlays" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
