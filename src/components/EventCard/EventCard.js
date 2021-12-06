// Styles
import {
  Wrapper,
  Content,
  Close,
  Title,
  Text,
  CloseImage,
  Logo,
  EditIcon,
  FormWrapper,
  EventDates,
} from "./EventCard.style";

// Icon
import CloseIcon from "../../assets/icons/close.png";
import ExternalLink from "../../assets/icons/external-link.png";
import Time from "../../assets/icons/time.png";
import Document from "../../assets/icons/document.png";
import VilniusLogo from "../../assets/icons/VILNIUS_LOGO.png";
import Edit from "../../assets/icons/edit.png";
// import Category from "../../assets/icons/category.png";

//hooks
import { useOpenClose } from "../../hooks/useOpenClose";

const EventCard = ({
  organization,
  url,
  title,
  category,
  startDate,
  finishDate,
  comment,
  description,
  children,
  handleChange,
  handleLocation,
}) => {
  const { handleOpen, show } = useOpenClose();

  return (
    <>
      {show ? (
        <FormWrapper>
          <CloseImage src={CloseIcon} alt="close-icon" onClick={handleChange} />
          {children}
        </FormWrapper>
      ) : (
        <Wrapper>
          <Close>
            <EditIcon src={Edit} alt="edit-icon" onClick={handleOpen} />
            <Logo src={VilniusLogo} alt="vilnius-logo" />
            <CloseImage
              src={CloseIcon}
              alt="close-icon"
              onClick={handleChange}
            />
          </Close>
          <Content>
            <div>
              <Title>
                <h3>{title}</h3>
              </Title>
              <Text>
                <img src={Time} alt="time" />
                <EventDates>
                  <p>Pradžia: {startDate}</p>
                  <p>Pabaiga: {finishDate}</p>
                </EventDates>
              </Text>
              <Text>
                <img src={Document} alt="document" />
                <p>{organization}</p>
              </Text>
              {/* <Text>
                <img src={Category} alt="category" />
                <p>{category}</p>
              </Text> */}
              <Text onClick={handleLocation}>
                <img src={ExternalLink} alt="place" />
                <a href={url} target="_blank" rel="noreferrer">
                  Renginio puslapis
                </a>
              </Text>
              <Text>
                <p>
                  Pastabos:
                  {comment && comment.length && comment !== undefined
                    ? " " + comment
                    : " Pastabų nėra"}
                </p>
              </Text>
              <Text>
                <p>
                  Aprašymas:
                  {description && description.length
                    ? " " + description
                    : " Aprašymo nėra"}
                </p>
              </Text>
            </div>
          </Content>
        </Wrapper>
      )}
    </>
  );
};

export default EventCard;
