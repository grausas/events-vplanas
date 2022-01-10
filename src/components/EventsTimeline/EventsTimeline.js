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
  CloseImage,
} from "./EventsTimeline.style";
// utils
import { CategoryData } from "../../utils/CategoryData";
// helpers
import { changeDate, changeTime } from "../../helpers/DateChange";
// icons
import CloseIcon from "../../assets/icons/close.png";

const EventsTimeline = ({ events, handleClose, handleEventOpen }) => {
  return (
    <>
      <Wrapper maxWidth={events.length > 1 ? 0 : 1}>
        <Close onClick={handleClose}>
          <CloseImage src={CloseIcon} alt="close-icon" />
        </Close>
        <TimelineContainer left={events.length > 1 ? 0 : 1}>
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
                <TimelineItem
                  key={event.attributes.OBJECTID}
                  color={events.length > 1 ? 0 : 1}
                  width={events.length > 1 ? 1 : 0}
                >
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
