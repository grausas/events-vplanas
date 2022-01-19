// Style
import { Wrapper, Content, Text } from "./EventsSchedule.style";

const EventsSchedule = ({ children, events, handleZoom, handleOpen, show }) => {
  // const { handleOpen, show } = useOpenClose();

  return (
    <Wrapper close={!show}>
      <Text onClick={handleOpen} text={show}>
        <h3>Renginiai</h3>
        <span>{show ? "-" : "+"}</span>
      </Text>
      <Content>{show && <>{children}</>}</Content>
    </Wrapper>
  );
};

export default EventsSchedule;
