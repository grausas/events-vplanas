// Styles
import {
  Wrapper,
  Content,
  IconFilter,
  FilterContent,
  CloseImage,
} from "./Filter.style";
// hooks
import { useOpenClose } from "../../hooks/useOpenClose";
// Icons
import FilterIcon from "../../assets/icons/filter.png";
import CloseIcon from "../../assets/icons/close.png";
// components
import { CheckBox } from "../index";

// notes: onclick open filter by organization, date and type
// take info from data state and filter on map

const Filter = ({ data, onChange }) => {
  const { handleOpen, show } = useOpenClose();

  return (
    <Wrapper close={show}>
      <IconFilter>
        {!show ? (
          <div onClick={handleOpen}>
            <img src={FilterIcon} alt="filter" />
            <span>Filtras</span>
          </div>
        ) : (
          <CloseImage src={CloseIcon} alt="close" onClick={handleOpen} />
        )}
      </IconFilter>
      {show && (
        <Content>
          <span>Kategorijos</span>
          <FilterContent onChange={onChange}>
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
          </FilterContent>
        </Content>
      )}
    </Wrapper>
  );
};

export default Filter;
