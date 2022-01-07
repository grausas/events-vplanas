// styles
import {
  Wrapper,
  TimelineContainer,
  TimelineItem,
  ItemContent,
  Circle,
} from "./EventsTimeline.style";

const EventsTimeline = ({ events }) => {
  return (
    <Wrapper>
      <TimelineContainer>
        {events &&
          events.map((event) => {
            return (
              <TimelineItem key={event.attributes.OBJECTID}>
                <ItemContent>
                  <span>{event.attributes.KATEGORIJA}</span>
                  <time>{event.attributes.RENGINIO_PRADZIA}</time>
                  <span>{event.attributes.PAVADINIMAS}</span>
                  <Circle />
                </ItemContent>
              </TimelineItem>
            );
          })}
      </TimelineContainer>
    </Wrapper>
  );
};

export default EventsTimeline;
