// Styles
import { Wrapper, Content, IconFilter } from "./Filter.style";
// hooks
import { useOpenClose } from "../../hooks/useOpenClose";
// Icons
import FilterIcon from "../../assets/icons/filter.png";
// components
import { CheckBox } from "../index";

// notes: onclick open filter by organization, date and type
// take info from data state and filter on map

const Filter = ({ data, onChange }) => {
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
        <Content onChange={onChange}>
          {data &&
            data.map((item) => {
              return (
                <CheckBox
                  key={item.id}
                  value={item.id}
                  id={item.id}
                  label={item.text}
                />
              );
            })}
        </Content>
      )}
    </Wrapper>
  );
};

export default Filter;
