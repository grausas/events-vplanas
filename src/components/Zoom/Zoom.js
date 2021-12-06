//styles
import { Wrapper, Button } from "./Zoom.style";

const Zoom = ({ handleZoomIn, handleZoomOut }) => {
  return (
    <Wrapper>
      <Button onClick={handleZoomIn}>+</Button>
      <Button onClick={handleZoomOut}>-</Button>
    </Wrapper>
  );
};

export default Zoom;
