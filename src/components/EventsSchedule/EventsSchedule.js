// Style
import { Wrapper, Content, Text, Events } from "./EventsSchedule.style";

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
          <Events>
            {children}
            {events &&
              events.map((event) => {
                const eventDate = changeDate(
                  new Date(event.attributes.RENGINIO_PRADZIA)
                );
                const eventTime = changeTime(
                  new Date(event.attributes.RENGINIO_PRADZIA)
                );

                console.log(eventDate);

                return (
                  <div key={event.attributes.OBJECTID}>
                    <p>{eventDate}</p>
                    <p>{eventTime}</p>
                    <p>{event.attributes.PAVADINIMAS}</p>
                    <p>Daugiau...</p>
                  </div>
                );
              })}
          </Events>
        )}
      </Content>
    </Wrapper>
  );
};

export default EventsSchedule;
