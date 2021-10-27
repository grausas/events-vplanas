// styles
import { Wrapper, LoadingBlock } from "./Loading.style";

function Loading({ id }) {
  return (
    <Wrapper id={id}>
      <LoadingBlock></LoadingBlock>
    </Wrapper>
  );
}

export default Loading;
