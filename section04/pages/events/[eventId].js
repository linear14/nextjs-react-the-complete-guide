import { useRouter } from "next/router";

import { getEventById } from "../../data/dummy-data";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

export default function SpecificEventPage() {
  const router = useRouter();

  const { eventId } = router.query;
  const event = getEventById(eventId);

  if (!event) {
    return <p>No Event Found!</p>;
  }

  return (
    <>
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
    </>
  );
}
