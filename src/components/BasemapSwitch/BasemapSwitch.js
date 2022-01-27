// styles
import { Wrapper, BasemapDiv } from "./BasemapSwitch.style";

const BasemapSwitch = ({ handleChangeBasemap }) => {
  return (
    <Wrapper onChange={handleChangeBasemap}>
      <BasemapDiv>
        <input
          type="radio"
          name="basemap"
          value="1"
          id="zemelapis"
          defaultChecked
        />
        <label htmlFor="zemelapis">Žemėlapis</label>
      </BasemapDiv>
      <BasemapDiv>
        <input type="radio" name="basemap" value="2" id="palydovas" />
        <label htmlFor="palydovas">Palydovas</label>
      </BasemapDiv>
    </Wrapper>
  );
};

export default BasemapSwitch;
