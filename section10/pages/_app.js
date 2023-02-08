import Head from "next/head";

import Layout from "../components/layout/layout";
import Notification from "../components/ui/notification";
import { NotificationContextProvider } from "../store/notification-context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    // 모든 컴포넌트에서 컨텍스트를 활용할 수 있도록 감싸줌
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Next Events</title>
          <meta name="description" content="NextJS Events" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
        {/* 진행중인 요청이 있거나 요청에 대한 응답이 있을 때만 노티가 나타나야 함: 렌더는 이 컴포넌트에서 하지만 트리거는 다른 컴포넌트에서 진행됨 */}
        <Notification title="Test" message="This is a test" status="error" />
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
