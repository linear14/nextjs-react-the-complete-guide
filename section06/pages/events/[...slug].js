import { Fragment } from "react";

import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function FilteredEventsPage(props) {
  const { isInValid, filteredEvents, date } = props;

  if (isInValid) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <ResultsTitle date={JSON.parse(date)} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  const [filteredYear, filteredMonth] = slug;

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: {
        isInValid: true,
      },
    };
  }

  const url = "https://nextjs-course-e1c99-default-rtdb.firebaseio.com/events.json";
  const response = await fetch(url);
  const data = await response.json();

  const filteredEvents = Object.values(data).filter((item) => {
    const eventDate = new Date(item.date);
    return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
  });

  return {
    props: {
      filteredEvents,
      date: JSON.stringify(new Date(numYear, numMonth - 1)),
    },
  };
}

export default FilteredEventsPage;
