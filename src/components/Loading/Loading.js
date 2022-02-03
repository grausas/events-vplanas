// styles
import { Wrapper, Content, LoadingBlock } from "./Loading.style";

function Loading({ id }) {
  return (
    <Wrapper id={id}>
      <Content>
        <LoadingBlock>
          <div className="sh1"></div>
          <div className="sh2"></div>
          {/* <h4 className="lt">kraunasi</h4> */}
        </LoadingBlock>
      </Content>
    </Wrapper>
  );
}

export default Loading;
