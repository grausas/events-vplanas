// Style
import { Wrapper, Content, Text, MoreDiv } from "./EventsSchedule.style";

const EventsSchedule = ({
  children,
  events,
  handleZoom,
  handleOpen,
  show,
  handleOpenMore,
}) => {
  // const { handleOpen, show } = useOpenClose();

  return (
    <Wrapper close={!show}>
      <Text onClick={handleOpen} text={show}>
        <h3>Renginiai</h3>
        <span>{show ? "-" : "+"}</span>
      </Text>
      <Content>
        {show && <>{children}</>}
        {show && (
          <MoreDiv>
            <span onClick={handleOpenMore}>Rodyti visus</span>
          </MoreDiv>
        )}
      </Content>
    </Wrapper>
  );
};

export default EventsSchedule;
