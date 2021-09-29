// Styles
import { Wrapper, Content } from "./Filter.style";
// hooks
import { useOpenClose } from "../../hooks/useOpenClose";

// notes: onclick open filter by organization, date and type
// take info from data state and filter on map

const Filter = () => {
  const { handleOpen, show } = useOpenClose();

  return (
    <Wrapper close={show}>
      <span onClick={handleOpen}>
        {!show ? "Filtruoti" : "Filtruoti pagal:"}
      </span>
      {show && (
        <Content>
          <div>
            <input type="checkbox" />
            <p>Organizacija</p>
          </div>
          <div>
            <input type="checkbox" />
            <p>Tipas</p>
          </div>
          <div>
            <input type="checkbox" />
            <p>Data</p>
          </div>
        </Content>
      )}
    </Wrapper>
  );
};

export default Filter;
