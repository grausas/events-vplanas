// Styles
import { Wrapper, Content, IconFilter } from "./Filter.style";
// hooks
import { useOpenClose } from "../../hooks/useOpenClose";
// Icons
import FilterIcon from "../../assets/icons/filter.png";

// notes: onclick open filter by organization, date and type
// take info from data state and filter on map

const Filter = () => {
  const { handleOpen, show } = useOpenClose();

  return (
    <Wrapper close={show}>
      <IconFilter onClick={handleOpen}>
        {!show ? (
          <div>
            <img src={FilterIcon} alt="filter" />
            <span>Filtras</span>
          </div>
        ) : (
          "Filtruoti pagal:"
        )}
      </IconFilter>
      {show && (
        <Content>
          <div>Filtras</div>
        </Content>
      )}
    </Wrapper>
  );
};

export default Filter;
