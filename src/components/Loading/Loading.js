// styles
import { Wrapper, Content, LoadingBlock } from "./Loading.style";
// category icons
import Susirinkimas from "../../assets/icons/categories/IKONOS RENGINIAI 32x32-01.png";
import SportoRenginys from "../../assets/icons/categories/IKONOS RENGINIAI 32x32-02.png";
import Koncertas from "../../assets/icons/categories/IKONOS RENGINIAI 32x32-03.png";
import Filmavimas from "../../assets/icons/categories/IKONOS RENGINIAI 32x32-04.png";
import Muge from "../../assets/icons/categories/IKONOS RENGINIAI 32x32-05.png";
import RenginysSeimai from "../../assets/icons/categories/IKONOS RENGINIAI 32x32-06.png";
import ValstybinisRenginys from "../../assets/icons/categories/IKONOS RENGINIAI 32x32-07.png";
import ViesasisRenginys from "../../assets/icons/categories/IKONOS RENGINIAI 32x32-08.png";

function Loading({ id }) {
  return (
    <Wrapper id={id}>
      <Content>
        <LoadingBlock>
          {/* <div className="sh1"></div>
          <div className="sh2"></div> */}
          {/* <h4 className="lt">kraunasi</h4> */}
          <img src={Susirinkimas} alt="s" />
          <img src={SportoRenginys} alt="s" />
          <img src={Koncertas} alt="s" />
          <img src={Filmavimas} alt="s" />
          <img src={Muge} alt="s" />
          <img src={RenginysSeimai} alt="s" />
          <img src={ValstybinisRenginys} alt="s" />
          <img src={ViesasisRenginys} alt="s" />
        </LoadingBlock>
      </Content>
    </Wrapper>
  );
}

export default Loading;
