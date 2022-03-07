import { getFeaturedEvents } from "../data/dummy-data";
import EventList from "../components/event/EventList";

export default function HomePage() {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}
