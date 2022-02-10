// Style
import {
  Wrapper,
  Content,
  Text,
  MoreDiv,
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
  handleOpenMore,
  filter,
  search,
}) => {
  return (
    <Wrapper close={!show}>
      <Text onClick={handleOpen} text={show}>
        <h3>Renginiai</h3>
        <span>
          {!show && <ExpandImage src={ExpandIcon} alt="close-icon" />}
        </span>
        {show && <CloseImage src={CloseIcon} alt="close-icon" />}
      </Text>
      {show && (
        <>
          <FilterDiv>{filter}</FilterDiv>
          <SearchDiv>{search}</SearchDiv>
        </>
      )}
      <Content>
        {show && <>{children}</>}
        {show && (
          <MoreDiv>
            <span onClick={handleOpenMore}>Rodyti visus</span>
          </MoreDiv>
        )}
      </Content>
    </Wrapper>
  );
};

export default EventsSchedule;
