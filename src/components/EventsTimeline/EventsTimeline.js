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
} from "./EventsTimeline.style";
//hooks
import { useOpenClose } from "../../hooks/useOpenClose";

const EventsTimeline = ({ events, handleClose }) => {
  const { handleOpen, show } = useOpenClose();

  return (
    <>
      <Wrapper>
        <span onClick={handleClose}>X</span>
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
