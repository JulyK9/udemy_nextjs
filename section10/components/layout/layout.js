import { Fragment, useContext } from "react";
import NotificationContext from "../../store/notification-context";
import Notification from "../ui/notification";

import MainHeader from "./main-header";

function Layout(props) {
  // 콘텍스트 제공자가 아닌 콘텍스트 객체 자체를 불러와서 액세스 해야 함
  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {/* 진행중인 요청이 있거나 요청에 대한 응답이 있을 때만 노티가 나타나야 함: 렌더는 이 컴포넌트에서 하지만 트리거는 다른 컴포넌트에서 진행됨 */}
      {activeNotification && (
        // <Notification title="Test" message="This is a test" status="error" />
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
}

export default Layout;
