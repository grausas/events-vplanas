// Style
import { Wrapper, Content, Text, Events } from "./EventsSchedule.style";

// hooks
import { useOpenClose } from "../../hooks/useOpenClose";

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
                const eventDate = new Date(
                  event.attributes.RENGINIO_PRADZIA
                ).toLocaleString("lt-LT", {
                  timeZone: "Europe/Vilnius",
                });

                return (
                  <div key={event.attributes.OBJECTID}>
                    <p>{eventDate}</p>
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
