import css from "./EventItem.module.css";
import Button from "../ui/Button";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";

function EventItem(props) {
  const { id, title, image, date, location } = props;

  const humanReadableDate = new Date(date).toLocaleDateString("ko-KR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedAddress = location.replace(", ", "\n");
  const exploreLink = `/events/${id}`;

  return (
    <li className={css.item}>
      <img src={`/${image}`} alt={title} />
      <div className={css.content}>
        <div className={css.summary}>
          <h2>{title}</h2>
          <div className={css.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={css.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={css.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={css.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}

export default EventItem;
