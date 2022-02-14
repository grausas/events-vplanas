// styles
import {
  Wrapper,
  TimelineContainer,
  TimelineItem,
  ItemContent,
  CategoryDiv,
  EventDate,
  Text,
  Circle,
  // Close,
  // ClearButton,
} from "./EventsTimeline.style";
// components
import { Category } from "../index";
// utils
import { CategoryData } from "../../utils/CategoryData";
// helpers
import { changeDate, changeTime } from "../../helpers/DateChange";

const EventsTimeline = ({
  events,
  handleEventOpen,
  clickedEvent,
  emptyTimeline,
}) => {
  return (
    <Wrapper>
      <TimelineContainer>
        {emptyTimeline && <h2>{emptyTimeline}</h2>}
        {events &&
          events.map((event) => {
            const result = CategoryData.find(
              ({ id }) => id === event.attributes.KATEGORIJA
            );
            const eventStartDate = changeDate(
              new Date(event.attributes.RENGINIO_PRADZIA)
            );
            const eventStartTime = changeTime(
              new Date(event.attributes.RENGINIO_PRADZIA)
            );
            const eventFinishDate = changeDate(
              new Date(event.attributes.RENGINIO_PABAIGA)
            );
            const eventFinishTime = changeTime(
              new Date(event.attributes.RENGINIO_PABAIGA)
            );
            return (
              <TimelineItem key={event.attributes.OBJECTID}>
                <ItemContent
                  onClick={() => handleEventOpen(event.attributes.OBJECTID)}
                  clickedEvent={
                    event.attributes.OBJECTID === clickedEvent
                      ? "clicked"
                      : null
                  }
                >
                  <CategoryDiv>
                    <Category
                      bgColor={event.attributes.KATEGORIJA}
                      text={result && result.text}
                      bgImage={event.attributes.KATEGORIJA}
                    />
                  </CategoryDiv>
                  <EventDate>{eventStartDate + " " + eventStartTime}</EventDate>
                  <EventDate>
                    {eventFinishDate + " " + eventFinishTime}
                  </EventDate>
                  <Text>{event.attributes.PAVADINIMAS}</Text>
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
