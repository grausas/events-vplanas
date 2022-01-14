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

const EventsSchedule = ({ children, events, handleZoom, handleOpen, show }) => {
  // const { handleOpen, show } = useOpenClose();

  return (
    <Wrapper close={!show}>
      <Text onClick={handleOpen} text={show}>
        <h3>Renginiai</h3>
        <span>{show ? "-" : "+"}</span>
      </Text>
      <Content>
        {show && (
          <>
            {children}
            {/* {events &&
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
                  <Events
                    key={event.attributes.OBJECTID}
                    backgroundColor={event.attributes.KATEGORIJA}
                  >
                    <EventsText>
                      <p>{event.attributes.PAVADINIMAS}</p>
                      <p>{event.attributes.ORGANIZATORIUS}</p>
                    </EventsText>
                    <EventsTimestamp>
                      <p>
                        Pradžia: {eventDate} | {eventTime}
                      </p>
                      <p>
                        Pabaiga: {eventFinishDate} | {eventFinishTime}
                      </p>
                    </EventsTimestamp>
                    <MoreButtonWrapper>
                      <MoreButton
                        onClick={() => handleZoom(event.attributes.OBJECTID)}
                      >
                        Peržiūrėti
                      </MoreButton>
                    </MoreButtonWrapper>
                  </Events>
                );
              })} */}
          </>
        )}
      </Content>
    </Wrapper>
  );
};

export default EventsSchedule;
