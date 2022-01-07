// styles
import { Wrapper } from "./EventsTimeline.style";

const EventsTimeline = ({ events }) => {
  return (
    <Wrapper>
      {events &&
        events.map((event) => {
          return (
            <ul key={event.attributes.OBJECTID}>
              <li>{event.attributes.PAVADINIMAS}</li>
            </ul>
          );
        })}
    </Wrapper>
  );
};

export default EventsTimeline;
