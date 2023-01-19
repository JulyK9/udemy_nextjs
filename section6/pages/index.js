import { getFeaturedEvents } from "../dummy-data";
import EventList from "../components/events/event-list";

function HomePage(props) {
  const { events } = props;
  // const featuredEvents = getFeaturedEvents();
  console.log(events);
  return (
    <div>
      {/* <EventList items={featuredEvents} /> */}
      <EventList items={events} />
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    "https://nextjs-course-e6529-default-rtdb.firebaseio.com/events.json"
  );

  const data = await res.json();

  // console.log(data); // 가져오는 데이터 형태 확인

  const transformedData = [];

  for (const key in data) {
    transformedData.push({
      id: key,
      location: data[key].location,
      title: data[key].title,
      description: data[key].description,
      image: data[key].image,
      date: data[key].date,
    });
  }

  // console.log(transformedData); // 변형된 데이터 확인

  return {
    props: { events: transformedData },
  };
}

export default HomePage;
