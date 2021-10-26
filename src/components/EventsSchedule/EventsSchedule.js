// Style
import {
  Wrapper,
  Content,
  Text,
  Events,
  EventsTimestamp,
  EventsText,
} from "./EventsSchedule.style";

// hooks
import { useOpenClose } from "../../hooks/useOpenClose";
//helpers
import { changeDate, changeTime } from "../../helpers/DateChange";

const EventsSchedule = ({ children, events }) => {
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
                      <div>
                        <p>{eventDate}</p>
                        <p>{eventTime}</p>
                      </div>
                      <div>
                        <p>{eventFinishDate}</p>
                        <p>{eventFinishTime}</p>
                      </div>
                    </EventsTimestamp>
                    <EventsText>
                      <p>{event.attributes.PAVADINIMAS}</p>
                      <p>Daugiau...</p>
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
