import EventList from "../components/events/event-list";

function HomePage(props) {
  const { featuredEvents } = props;

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}

export async function getServerSideProps() {
  const url = "https://nextjs-course-e1c99-default-rtdb.firebaseio.com/events.json";
  const response = await fetch(url);
  const data = await response.json();

  const featuredEvents = Object.values(data).filter((item) => item.isFeatured === true);
  return {
    props: {
      featuredEvents,
    },
  };
}

export default HomePage;
