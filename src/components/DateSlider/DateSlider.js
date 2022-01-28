// styles
import { Wrapper, SliderDiv, IconDiv, Icon } from "./DateSlider.style";
// hooks
import { useOpenClose } from "../../hooks/useOpenClose";
// icon
import TimelineIcon from "../../assets/icons/timeline.png";

const TimeSlider = ({ id }) => {
  const { handleOpen, show } = useOpenClose();

  return (
    <>
      <IconDiv>
        <Icon Icon src={TimelineIcon} alt="home-icon" onClick={handleOpen} />
      </IconDiv>
      <SliderDiv display={!show ? "display" : null}>
        <div id={id}></div>
      </SliderDiv>
    </>
  );
};

export default TimeSlider;
