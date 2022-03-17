// styles
import { Wrapper, LoadingBlock } from "./Loading.style";
// icon

function Loading({ id }) {
  return (
    <Wrapper id={id}>
      <LoadingBlock></LoadingBlock>
    </Wrapper>
  );
}

export default Loading;
