// styles
import { Wrapper, Content, LoadingBlock } from "./Loading.style";

function Loading({ id }) {
  return (
    <Wrapper id={id}>
      <Content>
        <LoadingBlock></LoadingBlock>
      </Content>
    </Wrapper>
  );
}

export default Loading;
