import { Fragment } from "react";
// import { useRouter } from "next/router";

// import { getEventById } from '../../dummy-data';
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import { getEventById, getAllEvents } from "../../helpers/api-util";

function EventDetailPage(props) {
  // const router = useRouter();

  // const eventId = router.query.eventId;
  const event = props.selectedEvent;

  // console.log(props);

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  // console.log(context);

  const { params } = context;
  const eventId = params.eventId; // 파일이름으로 인코딩한 식별자

  const event = await getEventById(eventId);

  // console.log(event);

  return {
    props: { selectedEvent: event },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    // paths: [
    //   { params: { eventId: "e1" } }
    // ],
    paths: paths,
    fallback: false,
  };
}

export default EventDetailPage;
