import { Fragment } from "react";

import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

function EventDetailPage(props) {
  const { event } = props;

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
  const { params } = context;
  const { eventId } = params;

  const url = "https://nextjs-course-e1c99-default-rtdb.firebaseio.com/events.json";
  const response = await fetch(url);
  const data = (await response.json())[eventId];

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      event: data,
    },
  };
}

export async function getStaticPaths() {
  const url = "https://nextjs-course-e1c99-default-rtdb.firebaseio.com/events.json";
  const response = await fetch(url);
  const data = await response.json();

  const pathsWithParams = Object.values(data).map((item) => ({
    params: { eventId: item.id },
  }));

  return {
    paths: pathsWithParams,
    fallback: "blocking",
  };
}

export default EventDetailPage;
