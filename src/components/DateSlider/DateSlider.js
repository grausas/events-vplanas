// styles
import { Wrapper, SliderDiv } from "./DateSlider.style";
// hooks
import { useOpenClose } from "../../hooks/useOpenClose";

const TimeSlider = ({ id }) => {
  const { handleOpen, show } = useOpenClose();

  return (
    <Wrapper>
      <div>
        <button onClick={handleOpen}>open </button>
        <SliderDiv id={id} display={!show ? "display" : null}></SliderDiv>
      </div>
    </Wrapper>
  );
};

export default TimeSlider;
