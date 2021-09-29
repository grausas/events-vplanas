// Style
import { Wrapper, Content, Text, Events } from "./EventsSchedule.style";

// hooks
import { useOpenClose } from "../../hooks/useOpenClose";

const EventsSchedule = ({ children }) => {
  const { handleOpen, show } = useOpenClose();

  return (
    <Wrapper close={show}>
      <Content>
        <Text onClick={handleOpen}>
          <h2>Renginiai</h2>
          <span>{!show ? "-" : "+"}</span>
        </Text>
        {!show && <Events>{children}</Events>}
      </Content>
    </Wrapper>
  );
};

export default EventsSchedule;
