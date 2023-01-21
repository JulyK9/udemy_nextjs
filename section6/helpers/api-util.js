// 주요 이벤트를 제공하는 함수
// 연습내용상으로는 우선 파베 서버에서 모든 이벤트를 페칭해서 로딩하는 로직이지만
// 파베 쿼리 매개변수를 통해 필터링해서 데이터를 가져오는 방법도 있음 https://firebase.google.com/docs/database/rest/retrieve-data
export async function getAllEvents() {
  const res = await fetch(
    "https://nextjs-course-e6529-default-rtdb.firebaseio.com/events.json"
  );
  const data = await res.json();

  const events = [];

  for (const key in data) {
    // console.log("key: ", key);
    events.push({
      id: key,
      ...data[key], // 키-값 쌍을 수동으로 적지 않고 스프레드 연산자로 객체를 복사!
    });
  }

  // console.log(events);

  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  // console.log(allEvents);
  // return DUMMY_EVENTS.filter((event) => event.isFeatured);
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
