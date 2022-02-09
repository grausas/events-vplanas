// styles
import {
  Wrapper,
  TimelineContainer,
  TimelineItem,
  ItemContent,
  Category,
  EventDate,
  Text,
  Circle,
  Close,
  MoreButton,
  ClearButton,
} from "./EventsTimeline.style";
// utils
import { CategoryData } from "../../utils/CategoryData";
// helpers
import { changeDate, changeTime } from "../../helpers/DateChange";

const EventsTimeline = ({
  events,
  handleMoreFilters,
  handleEventOpen,
  clickedEvent,
}) => {
  return (
    <>
      <Wrapper>
        <Close onClick={handleMoreFilters}>
          <ClearButton>Daugiau filtrų</ClearButton>
        </Close>
        <TimelineContainer>
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
                    <Category backgroundColor={event.attributes.KATEGORIJA}>
                      {result && result.text}
                    </Category>
                    <EventDate>
                      {eventStartDate + " " + eventStartTime}
                    </EventDate>
                    <EventDate>
                      {eventFinishDate + " " + eventFinishTime}
                    </EventDate>
                    <Text>{event.attributes.PAVADINIMAS}</Text>
                    <Circle />
                    <MoreButton>Rodyti žemėlapyje</MoreButton>
                  </ItemContent>
                </TimelineItem>
              );
            })}
        </TimelineContainer>
      </Wrapper>
    </>
  );
};

export default EventsTimeline;
