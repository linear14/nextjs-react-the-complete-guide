import { Fragment } from "react";

import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import { getFeaturedEvents, getSpecificEvent } from "../../helpers/api-util";

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

  const event = await getSpecificEvent(eventId);

  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      event,
    },
  };
}

export async function getStaticPaths() {
  const featuredEvents = await getFeaturedEvents();

  const pathsWithParams = featuredEvents.map((event) => ({
    params: { eventId: event.id },
  }));

  return {
    paths: pathsWithParams,
    fallback: "blocking",
  };
}

export default EventDetailPage;
