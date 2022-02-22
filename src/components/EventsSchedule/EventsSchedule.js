// Style
import {
  Wrapper,
  Content,
  Text,
  SearchDiv,
  FilterDiv,
  CloseImage,
  ExpandImage,
} from "./EventsSchedule.style";
// icons
import CloseIcon from "../../assets/icons/close.png";
import ExpandIcon from "../../assets/icons/expand.png";

const EventsSchedule = ({
  children,
  handleOpen,
  show,
  filter,
  search,
  scheduleTitle,
}) => {
  return (
    <Wrapper close={show}>
      <Text onClick={handleOpen} text={!show}>
        <h3>{show ? "Renginiai" : scheduleTitle}</h3>
        <span>{show && <ExpandImage src={ExpandIcon} alt="close-icon" />}</span>
        {!show && <CloseImage src={CloseIcon} alt="close-icon" />}
      </Text>
      {!show && (
        <>
          <SearchDiv>{search}</SearchDiv>
          <FilterDiv>{filter}</FilterDiv>
        </>
      )}
      <Content>{!show && <>{children}</>}</Content>
    </Wrapper>
  );
};

export default EventsSchedule;
