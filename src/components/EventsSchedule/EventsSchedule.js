// Style
import {
  Wrapper,
  Content,
  Text,
  MoreDiv,
  SearchDiv,
  FilterDiv,
} from "./EventsSchedule.style";

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
        <span>{show ? "-" : "+"}</span>
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
