import { Fragment } from "react";
import { useRouter } from "next/router";

// import { getAllEvents } from '../../dummy-data';
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { getAllEvents } from "../../helpers/api-util";

function AllEventsPage(props) {
  // const events = getAllEvents();
  const router = useRouter();
  // 동적 라우팅을 위한 id 값 같은 것을 페칭하지는 않지만 프로그램화된 내비게이션을 구현하려면 필요
  const { events } = props;

  // console.log(events);

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}

export default AllEventsPage;
