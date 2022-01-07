// styles
import {
  Wrapper,
  TimelineContainer,
  TimelineItem,
  ItemContent,
  Category,
  Date,
  Text,
  Circle,
  Close,
  MoreButton,
} from "./EventsTimeline.style";

const EventsTimeline = ({ events, handleClose, handleEventOpen }) => {
  return (
    <>
      <Wrapper>
        <Close onClick={handleClose}>X</Close>
        <TimelineContainer>
          {events &&
            events.map((event) => {
              return (
                <TimelineItem key={event.attributes.OBJECTID}>
                  <ItemContent>
                    <Category backgroundColor={event.attributes.KATEGORIJA}>
                      {event.attributes.KATEGORIJA}
                    </Category>
                    <Date>{event.attributes.RENGINIO_PRADZIA}</Date>
                    <Text>{event.attributes.PAVADINIMAS}</Text>
                    <Circle />
                    <MoreButton
                      onClick={() => handleEventOpen(event.attributes.OBJECTID)}
                    >
                      Perziureti rengini
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
