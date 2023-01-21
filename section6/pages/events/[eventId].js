import { Fragment } from "react";
// import { useRouter } from "next/router";

// import { getEventById } from '../../dummy-data';
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
// import { getEventById, getAllEvents } from "../../helpers/api-util";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";

function EventDetailPage(props) {
  // const router = useRouter();

  // const eventId = router.query.eventId;
  const event = props.selectedEvent;

  // console.log(props);

  // fallback 이 true 일때 표시해주는 부분
  if (!event) {
    return (
      <div className="center">Loading...</div>
      // <ErrorAlert>
      //   <p>No event found!</p>
      // </ErrorAlert>
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
  // const events = await getAllEvents();
  const events = await getFeaturedEvents(); // 이렇게 하면 일부 페이지가 사전 생성되지 않음

  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    // paths: [
    //   { params: { eventId: "e1" } }
    // ],
    paths: paths,
    // fallback: false, // 필요한 모든 페이지를 준비했다고 알리는 옵션은 false
    fallback: true, // 위에서 설정한 event 가 없을 경루 early return 을 보여줌
    // fallback: "blocking", // 이 경우는 페이지가 생성될 때까지 아무것도 하지 않음
  };
}

export default EventDetailPage;
