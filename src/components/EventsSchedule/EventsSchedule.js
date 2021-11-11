// Style
import {
  Wrapper,
  Content,
  Text,
  Events,
  EventsTimestamp,
  EventsText,
  MoreButtonWrapper,
  MoreButton,
} from "./EventsSchedule.style";

// hooks
import { useOpenClose } from "../../hooks/useOpenClose";
//helpers
import { changeDate, changeTime } from "../../helpers/DateChange";

const EventsSchedule = ({ children, events, handleZoom }) => {
  const { handleOpen, show } = useOpenClose();

  return (
    <Wrapper close={!show}>
      <Content>
        <Text onClick={handleOpen} text={show}>
          <h3>Renginiai</h3>
          <span>{show ? "-" : "+"}</span>
        </Text>
        {show && (
          <>
            {children}
            {events &&
              events.map((event) => {
                const eventDate = changeDate(
                  new Date(event.attributes.RENGINIO_PRADZIA)
                );
                const eventTime = changeTime(
                  new Date(event.attributes.RENGINIO_PRADZIA)
                );
                const eventFinishDate = changeDate(
                  new Date(event.attributes.RENGINIO_PABAIGA)
                );
                const eventFinishTime = changeTime(
                  new Date(event.attributes.RENGINIO_PABAIGA)
                );

                return (
                  <Events key={event.attributes.OBJECTID}>
                    <EventsTimestamp>
                      <p>
                        Pradžia: {eventDate} | {eventTime}
                      </p>
                      <p>
                        Pabaiga: {eventFinishDate} | {eventFinishTime}
                      </p>
                    </EventsTimestamp>
                    <EventsText>
                      <p>{event.attributes.PAVADINIMAS}</p>
                      <MoreButtonWrapper>
                        <MoreButton
                          onClick={() => handleZoom(event.attributes.OBJECTID)}
                        >
                          Daugiau
                        </MoreButton>
                      </MoreButtonWrapper>
                    </EventsText>
                  </Events>
                );
              })}
          </>
        )}
      </Content>
    </Wrapper>
  );
};

export default EventsSchedule;
