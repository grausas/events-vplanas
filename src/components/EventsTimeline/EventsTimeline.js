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
// utils
import { CategoryData } from "../../utils/CategoryData";

const EventsTimeline = ({ events, handleClose, handleEventOpen }) => {
  return (
    <>
      <Wrapper>
        <Close onClick={handleClose}>X</Close>
        <TimelineContainer>
          {events &&
            events.map((event) => {
              const result = CategoryData.find(
                ({ id }) => id === event.attributes.KATEGORIJA
              );
              return (
                <TimelineItem key={event.attributes.OBJECTID}>
                  <ItemContent>
                    <Category backgroundColor={event.attributes.KATEGORIJA}>
                      {result.text}
                    </Category>
                    <Date>{event.attributes.RENGINIO_PRADZIA}</Date>
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
