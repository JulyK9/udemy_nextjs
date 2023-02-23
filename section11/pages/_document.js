import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head lang="en" />
        <body>
          <Main />
          <NextScript />
          {/* Notification 컴포넌트가 렌더될 때 여기로 연결되도록 하는 사전 작업 */}
          <div id="notifications"></div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
