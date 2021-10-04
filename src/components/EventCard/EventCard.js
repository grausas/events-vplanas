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

import { useOpenClose } from "../../hooks/useOpenClose";

// components
import InputField from "../InputField/InputField";

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
  // const [isEditing, setIsEditing] = useState(false);
  const { handleOpen, show } = useOpenClose();

  return (
    <Wrapper>
      <Close>
        <span onClick={() => handleOpen(show)}>Edit</span>
        <Logo src={VilniusLogo} alt="vilnius-logo" />
        <CloseImage src={CloseIcon} alt="close-icon" onClick={handleChange} />
      </Close>
      <Content>
        {show ? (
          <form onSubmit={handleSubmit}>
            <Title>
              <InputField
                type="text"
                defaultValue={defaultValue}
                onChange={handleInput}
                value={value}
                labelText="Pavadinimas"
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
            <input type="submit" value="Submit" />
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
