// Styles
import { Wrapper, Content, Close, Title } from "./EventCard.style";

// Icon
import CloseIcon from "../../assets/icons/close.png";

const EventCard = ({
  organization,
  place,
  title,
  date,
  time,
  handleChange,
}) => {
  return (
    <Wrapper>
      <Close>
        <img src={CloseIcon} alt="close-icon" onClick={handleChange} />
      </Close>
      <Content>
        <Title>
          <h3>{title}</h3>
        </Title>
        <div>
          <h5>Organizacija</h5>
          <p>{organization}</p>
        </div>
        <div>
          <h5>Vieta</h5>
          <p>{place}</p>
        </div>
        <div>
          <h5>Data</h5>
          <p>{date}</p>
        </div>
        <div>
          <h5>Laikas</h5>
          <p>{time}</p>
        </div>
      </Content>
    </Wrapper>
  );
};

export default EventCard;
