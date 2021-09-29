import { useState } from "react";

// Style
import { Wrapper, Content, Text, Events } from "./EventsSchedule.style";

const EventsSchedule = ({ children }) => {
  const [close, setClose] = useState(false);

  const handleClose = () => {
    setClose(!close);
  };

  return (
    <Wrapper>
      <Content>
        <Text>
          <h2>Artėjantys renginiai</h2>
          <span onClick={handleClose}>{!close ? "X" : "Y"}</span>
        </Text>
        {!close && <Events>{children}</Events>}
      </Content>
    </Wrapper>
  );
};

export default EventsSchedule;
