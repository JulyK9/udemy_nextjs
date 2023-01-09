import { getFilteredEvents } from "../../dummy-data";
import { useRouter } from "next/router";
// 동적 세그먼트 값 추출 => 이동한 페이지 url에 포함되어있음
// url에서 year와 month를 추출해서 그것과 매칭되는 이벤트를 찾아줌
import EventList from "../../components/events/EventList";

const FilteredEventsPage = () => {
  const router = useRouter();
  const filteredData = router.query.slug;

  // console.log(filteredData);

  // 배치순서 중요
  if (!filteredData) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return <p>Invalid filter. Please adjust your values!</p>;
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  // console.log(filteredEvents);

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p>No events found for the chosen filter</p>;
  }

  return (
    <div>
      <EventList items={filteredEvents} />
    </div>
  );
};

export default FilteredEventsPage;
