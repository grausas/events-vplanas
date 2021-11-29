// Styles
import {
  Wrapper,
  Content,
  IconFilter,
  FilterContent,
  CloseImage,
  DateFilter,
  ClearButton,
} from "./Filter.style";
// hooks
import { useOpenClose } from "../../hooks/useOpenClose";
// Icons
import FilterIcon from "../../assets/icons/filter.png";
import CloseIcon from "../../assets/icons/close.png";
// components
import { CheckBox, DatePicker } from "../index";

const Filter = ({
  data,
  onChange,
  selectedStart,
  selectedFinish,
  handleChangeStart,
  handleChangeFinish,
  handleClear,
}) => {
  const { handleOpen, show } = useOpenClose();

  return (
    <Wrapper close={show}>
      <IconFilter>
        {!show ? (
          <div onClick={handleOpen}>
            <img src={FilterIcon} alt="filter" />
          </div>
        ) : (
          <CloseImage src={CloseIcon} alt="close" onClick={handleOpen} />
        )}
      </IconFilter>
      {show && (
        <Content onChange={onChange}>
          <DateFilter>
            <DatePicker
              dateTitle="Nuo"
              displayTime="none"
              selected={selectedStart}
              handleChange={handleChangeStart}
              title="Pasirinkti pradžios datą"
            />
            <DatePicker
              dateTitle="Iki"
              displayTime="none"
              selected={selectedFinish}
              handleChange={handleChangeFinish}
              title="Pasirinkti pabaigos datą"
            />
          </DateFilter>
          <h5>Kategorijos</h5>
          <FilterContent>
            {data &&
              data.map((item) => {
                return (
                  <CheckBox
                    key={item.id}
                    value={item.value}
                    id={item.id}
                    label={item.text}
                  />
                );
              })}
          </FilterContent>
          <ClearButton handleClick={handleClear} value="clear">
            Išvalyti
          </ClearButton>
        </Content>
      )}
    </Wrapper>
  );
};

export default Filter;
