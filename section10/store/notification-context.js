import { createContext, useEffect, useState } from "react";

// 새로운 콘텍스트를 생성하여 알림을 제어할 목적

// 초기화 객체를 설정하여 콘텍스트 구조를 정의
// const notificationContext = createContext({
//   notification: null, // {title, message, status}
//   showNotification: function () {}, // 나중에 다른 곳에서 다른 함수로 교체하겠지만 기본 콘텍스트를 설정하여 자동 완성을 개선
//   hideNotification: function () {},
// });

// export default notificationContext;

// 콘텍스트로 새로운 컴포넌트를 생성
// 즉, Provider 컴포넌트를 생성하여 컴포넌트 주변 및 이 컴포넌트를 활용하는 자식 컴포넌트를 묶을 수 있음
const NotificationContext = createContext({
  notification: null, // {title, message, status}
  // 나중에 다른 곳에서 다른 함수로 교체하겠지만(하단에서 정의) 기본 콘텍스트를 설정하여 자동 완성을 개선
  showNotification: function (notificationData) {},
  hideNotification: function () {},
});

// 다른 컴포넌트를 감싸 모든 컴포넌트에서 콘텍스트에 엑세스 할 수 있는 컴포넌트를 정의해줌
// 그냥 _app.js에서 provider로 바로 감싸지 않고 이렇게 별도의 개별 랩퍼(wrapper)를 생성해서 감싸주는 핵심 이유는
// 이 컴포넌트 내부에서 useState를 사용해서 알림의 상태와 관련된 모든 콘텍스트를 관리하기 위함임.
export function NotificationContextProvider(props) {
  // 표시될 알림을 저장하는 상태
  const [activeNotification, setActiveNotification] = useState();

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
        // hideNotificationHandler()
      }, 2000);

      // useEffect에서 정리함수를 반환하여 실행한 타이머를 정리해줌
      // useEffect가 다시 실행되면서 timer가 중복 실행되는 것을 방지하기 위해 정리해주는 것
      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  function showNotificationHandler(notificationData) {
    // 알림 정보를 매개변수로 표시
    // 실제 함수를 여기서 정의하고 콘텍스트에 연결
    setActiveNotification(notificationData);
    // setActiveNotification({
    //   title: notificationData.title,
    //   message: notificationData.message,
    //   status: notificationData.status,
    // });
  }

  function hideNotificationHandler() {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    // Provider 컴포넌트에 대해 value 프로퍼티를 통해 연결된 모든 컴포넌트로 배포
    // show 또는 hideNotificationHandler 호출 시 NotificationContextProvider 컴포넌트가 다시 렌더링 되고
    // 연관된 컴포넌트에 업데이트된 콘텍스트 객체를 배포하게 된다.
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
