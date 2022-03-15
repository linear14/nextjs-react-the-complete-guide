export async function getAllEvents() {
  const url = "https://nextjs-course-e1c99-default-rtdb.firebaseio.com/events.json";
  const response = await fetch(url);
  const data = await response.json();

  return Object.values(data);
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured === true);
}

export async function getSpecificEvent(eventId) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === eventId);
}

export async function getFilteredEvents(year, month) {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });
}
