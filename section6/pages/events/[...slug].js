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
      props: { hasError: true }, // ?????? ??????????????? ?????? ??????????????? ?????? ???????????? ?????? ?????? ??????
      // notFound: true, // ???????????? ?????? ????????? ??? 404 ?????? ????????? ???????????? ??????
      // redirect: {  // ?????? ?????????????????? ????????? ???????????? ???????????? ????????? ??????
      //   destination: "/error",
      // },
    };

    // ?????? ?????? ?????????????????? ???????????????????????? jsx??? ?????? ??????
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
