//styles
import { Wrapper } from "./Zoom.style";
const Zoom = ({ handleZoomIn, handleZoomOut }) => {
  return (
    <Wrapper>
      <button onClick={handleZoomIn}>+</button>
      <button onClick={handleZoomOut}>-</button>
    </Wrapper>
  );
};

export default Zoom;
