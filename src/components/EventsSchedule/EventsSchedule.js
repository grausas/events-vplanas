import { useState } from "react";

// Style
import { Wrapper, Content, Text, Events } from "./EventsSchedule.style";

const EventsSchedule = ({ children }) => {
  const [close, setClose] = useState(false);

  const handleClose = () => {
    setClose(!close);
  };

  return (
    <Wrapper close={close}>
      <Content>
        <Text onClick={handleClose} close={!close}>
          <h2>Renginiai</h2>
          <span>{!close ? "-" : "+"}</span>
        </Text>
        {!close && <Events>{children}</Events>}
      </Content>
    </Wrapper>
  );
};

export default EventsSchedule;
