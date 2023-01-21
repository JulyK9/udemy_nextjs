import { Fragment } from "react";
// import { useRouter } from "next/router";

// import { getFilteredEvents } from "../../dummy-data";
import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function FilteredEventsPage(props) {
  // const router = useRouter();

  // const filterData = router.query.slug;

  // if (!filterData) {
  //   return <p className="center">Loading...</p>;
  // }

  // const filteredYear = filterData[0];
  // const filteredMonth = filterData[1];

  // const numYear = +filteredYear;
  // const numMonth = +filteredMonth;

  if (props.hasError) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  // const filteredEvents = getFilteredEvents({
  //   year: numYear,
  //   month: numMonth,
  // });

  const filteredEvents = props.events;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  // const date = new Date(numYear, numMonth - 1);
  // const date = new Date(props.events.numYear, props.events.numMonth - 1);
  const date = new Date(props.date.numYear, props.date.numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  // console.log(params);
  const filterData = params.slug;
  // console.log(filterData);

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

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
    return {
      props: { hasError: true }, // 해당 컴포넌트의 특정 프로퍼티로 에러 메시지를 띄울 수도 있음
      // notFound: true, // 유효하지 않은 조합일 때 404 에러 페이지 띄우도록 처리
      // redirect: {  // 다른 에러페이지가 있다면 그쪽으로 연결하는 방법도 있음
      //   destination: "/error",
      // },
    };

    // 예외 처리 대상이더라도 서버사이드에서는 jsx로 반환 불가
    // return (
    //   <Fragment>
    //     <ErrorAlert>
    //       <p>Invalid filter. Please adjust your values!</p>
    //     </ErrorAlert>
    //     <div className="center">
    //       <Button link="/events">Show All Events</Button>
    //     </div>
    //   </Fragment>
    // );
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}

export default FilteredEventsPage;
