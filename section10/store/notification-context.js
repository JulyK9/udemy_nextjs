import { createContext } from "react";

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
  showNotification: function () {}, // 나중에 다른 곳에서 다른 함수로 교체하겠지만 기본 콘텍스트를 설정하여 자동 완성을 개선
  hideNotification: function () {},
});

// 다른 컴포넌트를 감싸 모든 컴포넌트에서 콘텍스트에 엑세스 할 수 있는 컴포넌트를 정의해줌
// 그냥 _app.js에서 provider로 바로 감싸지 않고 이렇게 별도의 개별 랩퍼(wrapper)를 생성해서 감싸주는 핵심 이유는
// 이 컴포넌트 내부에서 useState를 사용해서 알림의 상태와 관련된 모든 콘텍스트를 관리하기 위함임.
export function NotificationContextProvider(props) {
  return (
    <NotificationContext.Provider>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
