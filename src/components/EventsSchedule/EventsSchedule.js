// Style
import { Wrapper, Content } from "./EventsSchedule.style";

const EventsSchedule = ({ children }) => {
  return (
    <Wrapper>
      <Content>
        <h2>Artėjantys renginiai</h2>
        {children}
      </Content>
    </Wrapper>
  );
};

export default EventsSchedule;
