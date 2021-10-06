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
import ExternalLink from "../../assets/icons/external-link.png";
import Time from "../../assets/icons/time.png";
import Document from "../../assets/icons/document.png";
import VilniusLogo from "../../assets/icons/VILNIUS_LOGO.png";
import Edit from "../../assets/icons/edit.png";

const EventCard = ({
  organization,
  url,
  title,
  startDate,
  finishDate,
  comment,
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
              <p>Pradžia: {startDate}</p>
              <p>Pabaiga: {finishDate}</p>
            </Text>
            <Text>
              <img src={Document} alt="document" />
              <p>{organization}</p>
            </Text>
            <Text onClick={handleLocation}>
              <img src={ExternalLink} alt="place" />
              <a href={url} target="_blank" rel="noreferrer">
                Renginio puslapis
              </a>
            </Text>
            <Text>
              <p>
                Pastabos:
                {comment && comment.length ? " " + comment : " Pastabų nėra"}
              </p>
            </Text>
          </div>
        )}
      </Content>
    </Wrapper>
  );
};

export default EventCard;
