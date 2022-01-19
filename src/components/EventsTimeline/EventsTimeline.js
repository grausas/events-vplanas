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

const EventsTimeline = ({ events, handleClose, handleEventOpen }) => {
  return (
    <>
      <Wrapper>
        <Close onClick={handleClose}>
          <ClearButton>Rodyti visus</ClearButton>
        </Close>
        <TimelineContainer>
          {events &&
            events.map((event) => {
              const result = CategoryData.find(
                ({ id }) => id === event.attributes.KATEGORIJA
              );
              const eventDate = changeDate(
                new Date(event.attributes.RENGINIO_PRADZIA)
              );
              const eventTime = changeTime(
                new Date(event.attributes.RENGINIO_PRADZIA)
              );
              return (
                <TimelineItem key={event.attributes.OBJECTID}>
                  <ItemContent>
                    <Category backgroundColor={event.attributes.KATEGORIJA}>
                      {result.text}
                    </Category>
                    <EventDate>{eventDate + " " + eventTime}</EventDate>
                    <Text>{event.attributes.PAVADINIMAS}</Text>
                    <Circle />
                    <MoreButton
                      onClick={() => handleEventOpen(event.attributes.OBJECTID)}
                    >
                      Peržiūrėti renginį
                    </MoreButton>
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
