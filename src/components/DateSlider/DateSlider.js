// styles
import { Wrapper, SliderDiv, IconDiv, Icon } from "./DateSlider.style";
// hooks
import { useOpenClose } from "../../hooks/useOpenClose";
// icon
import TimelineIcon from "../../assets/icons/timeline.png";

const TimeSlider = ({ id }) => {
  const { handleOpen, show } = useOpenClose();

  return (
    <Wrapper>
      <IconDiv>
        <Icon Icon src={TimelineIcon} alt="home-icon" onClick={handleOpen} />
      </IconDiv>
      <div>
        <SliderDiv id={id} display={!show ? "display" : null}></SliderDiv>
      </div>
    </Wrapper>
  );
};

export default TimeSlider;
