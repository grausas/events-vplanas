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
  ConfirmButton,
  EditIcon,
} from "./EventCard.style";

// Icon
import CloseIcon from "../../assets/icons/close.png";
import Place from "../../assets/icons/place.png";
import Time from "../../assets/icons/time.png";
import Document from "../../assets/icons/document.png";
import VilniusLogo from "../../assets/icons/VILNIUS_LOGO.png";
import Edit from "../../assets/icons/edit.png";

const EventCard = ({
  organization,
  place,
  title,
  date,
  time,
  children,
  handleChange,
  handleLocation,
  handleSubmit,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Wrapper>
      <Close>
        <EditIcon src={Edit} alt="edit-icon" onClick={handleEditing} />
        <Logo src={VilniusLogo} alt="vilnius-logo" />
        <CloseImage src={CloseIcon} alt="close-icon" onClick={handleChange} />
      </Close>
      <Content>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            {children}
            <ConfirmButton>Patvirtinti</ConfirmButton>
          </form>
        ) : (
          <div>
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
            </Text>
          </div>
        )}
      </Content>
    </Wrapper>
  );
};

export default EventCard;
