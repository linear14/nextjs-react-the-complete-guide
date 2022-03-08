import { useRouter } from "next/router";
import { getFilteredEvents } from "../../data/dummy-data";
import EventList from "../../components/event/EventList";

export default function FilteredEventPage() {
  const router = useRouter();

  const filterData = router.query.slug;

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  const [filteredYear, filteredMonth] = filterData;
  const [numYear, numMonth] = [+filteredYear, +filteredMonth];

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return <p className="center">Invalid filter.</p>;
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p className="center">No Events</p>;
  }

  return <EventList items={filteredEvents} />;
}
