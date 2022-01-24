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
      <SliderDiv
        id={id}
        className="sc-GEbAx iDehWm esri-time-slider esri-widget esri-time-slider__mode--time-window esri-time-slider__layout--compact calcite-theme-light"
        display={show ? "display" : null}
      ></SliderDiv>
    </Wrapper>
  );
};

export default TimeSlider;
