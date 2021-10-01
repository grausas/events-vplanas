import { useState } from "react";

// Styles
import {
  Wrapper,
  Content,
  Close,
  Title,
  Text,
  CloseImage,
  Logo,
} from "./EventCard.style";

// Icon
import CloseIcon from "../../assets/icons/close.png";
import Place from "../../assets/icons/place.png";
import Time from "../../assets/icons/time.png";
import Document from "../../assets/icons/document.png";
import VilniusLogo from "../../assets/icons/VILNIUS_LOGO.png";

const EventCard = ({
  organization,
  place,
  title,
  date,
  time,
  value,
  defaultValue,
  handleChange,
  handleLocation,
  handleInput,
  handleSubmit,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Wrapper>
      <Close>
        <span onClick={() => setIsEditing(true)}>Edit</span>
        <Logo src={VilniusLogo} alt="vilnius-logo" />
        <CloseImage src={CloseIcon} alt="close-icon" onClick={handleChange} />
      </Close>
      <Content>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <Title>
              <input
                defaultValue={defaultValue}
                onChange={handleInput}
                value={value}
              />
            </Title>
            <Text>
              <img src={Time} alt="time" />
              <p>
                {date} | {time}
              </p>
            </Text>
            <Text>
              <img src={Document} alt="document" />
              <p>{organization}</p>
            </Text>
            <Text onClick={handleLocation}>
              <img src={Place} alt="place" />
              <p>{place}</p>
            </Text>{" "}
            <button type="submit">Save</button>
          </form>
        ) : (
          <>
            {" "}
            <Title>
              <h3>{title}</h3>
            </Title>
            <Text>
              <img src={Time} alt="time" />
              <p>
                {date} | {time}
              </p>
            </Text>
            <Text>
              <img src={Document} alt="document" />
              <p>{organization}</p>
            </Text>
            <Text onClick={handleLocation}>
              <img src={Place} alt="place" />
              <p>{place}</p>
            </Text>{" "}
          </>
        )}
      </Content>
    </Wrapper>
  );
};

export default EventCard;
