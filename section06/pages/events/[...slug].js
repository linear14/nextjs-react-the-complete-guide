import { Fragment } from "react";

import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../helpers/api-util";

function FilteredEventsPage(props) {
  const { hasValidationError, filteredEvents, date } = props;

  // 유효한 필터 형식이 아닌 경우
  if (hasValidationError) {
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

  // 데이터가 없을 경우
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

function isValidFilter(year, month) {
  return (
    isNaN(year) || isNaN(month) || year > 2030 || year < 2021 || month < 1 || month > 12
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  const [filteredYear, filteredMonth] = slug;

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (isValidFilter(numYear, numMonth)) {
    return {
      props: {
        hasValidationError: true,
      },
    };
  }

  const filteredEvents = await getFilteredEvents(numYear, numMonth);

  return {
    props: {
      filteredEvents,
      date: JSON.stringify(new Date(numYear, numMonth - 1)),
    },
  };
}

export default FilteredEventsPage;
