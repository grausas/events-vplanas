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
  EventDates,
  CategoryDiv,
} from "./EventCard.style";
// Icon
import CloseIcon from "../../assets/icons/close.png";
import ExternalLink from "../../assets/icons/external-link.png";
import Time from "../../assets/icons/time.png";
import Document from "../../assets/icons/document.png";
import Edit from "../../assets/icons/edit.png";
// components
import { Category } from "../index";
// utils
import { CategoryData } from "../../utils/CategoryData";

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
  isLoggedIn,
  isMobile,
  handleEditEvent,
}) => {
  const { handleOpen, show } = useOpenClose();
  const result = CategoryData.find(({ id }) => id === Number(category));

  return (
    <>
      {show ? (
        <>{children}</>
      ) : (
        <Wrapper>
          <Close backgroundColor={category}>
            {isLoggedIn && (
              <EditIcon
                src={Edit}
                alt="edit-icon"
                loading="lazy"
                onClick={() => {
                  handleOpen();
                  handleEditEvent();
                }}
              />
            )}
            <Logo backgroundImage={category} />
            <CategoryDiv>
              <Category bgColor={category} text={result && result.text} />
            </CategoryDiv>
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
              {/* Do not show website if empty */}
              {url && (
                <Text onClick={handleLocation}>
                  <img src={ExternalLink} alt="place" />
                  <a href={url} target="_blank" rel="noreferrer">
                    Renginio puslapis
                  </a>
                </Text>
              )}
              {/* Do not show comment if empty */}
              {comment && isMobile && (
                <Text>
                  <p>
                    Gauta
                    {comment && comment.length && comment !== undefined
                      ? " " + comment
                      : " Pastabų nėra"}
                  </p>
                </Text>
              )}
              {/* Do not show description if empty */}
              {description && isMobile && (
                <Text>
                  <p>
                    Aprašymas:
                    {description && description.length
                      ? " " + description
                      : " Aprašymo nėra"}
                  </p>
                </Text>
              )}
            </div>
          </Content>
        </Wrapper>
      )}
    </>
  );
};

export default EventCard;
