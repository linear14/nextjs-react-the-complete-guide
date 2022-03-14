import { Fragment } from "react";
import { useRouter } from "next/router";

import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";

function AllEventsPage(props) {
  const router = useRouter();
  const { events } = props;

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
  const url = "https://nextjs-course-e1c99-default-rtdb.firebaseio.com/events.json";
  const response = await fetch(url);
  const data = await response.json();

  return {
    props: { events: Object.values(data) },
    revalidate: 10,
  };
}

export default AllEventsPage;
