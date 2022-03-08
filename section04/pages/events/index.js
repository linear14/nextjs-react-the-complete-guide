import { useRouter } from "next/router";
import EventSearch from "../../components/event-search/event-search";
import EventList from "../../components/event/EventList";
import { getAllEvents } from "../../data/dummy-data";

export default function AllEventPage() {
  const router = useRouter();
  const allEvents = getAllEvents();

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={allEvents} />
    </>
  );
}
