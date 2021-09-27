// Styles
import { Wrapper, Content, Close, Title, Text } from "./EventCard.style";

// Icon
import CloseIcon from "../../assets/icons/close.png";
import Place from "../../assets/icons/place.png";

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
        <Text>
          <p>
            {date} | {time}
          </p>
        </Text>
        <Title>
          <h3>{title}</h3>
        </Title>
        <Text>
          <p>{organization}</p>
        </Text>
        <Text>
          <img src={Place} alt="place" />
          <p>{place}</p>
        </Text>
      </Content>
    </Wrapper>
  );
};

export default EventCard;
