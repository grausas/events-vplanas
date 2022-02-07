import { useState, useCallback } from "react";
// Styles
import {
  Wrapper,
  Content,
  IconFilter,
  FilterContent,
  CloseImage,
  CloseImageDiv,
  DateFilter,
  ClearButton,
  CheckBoxDiv,
} from "./Filter.style";
// hooks
// Icons
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
  handleCloseFilter,
}) => {
  const [checkedItems, setCheckeditems] = useState(data);

  const handleOnChange = useCallback(
    (e) => {
      const index = e.target.name;
      let items = [...checkedItems];
      items[index].isChecked = e.target.checked;
      setCheckeditems(items);
    },
    [checkedItems]
  );

  const handleClearCheckbox = () => {
    let items = [...checkedItems];
    items.map((item) => {
      if (item.isChecked === true) {
        return (item.isChecked = false);
      } else return null;
    });
    setCheckeditems(items);
  };
  return (
    <Wrapper>
      <IconFilter>
        <CloseImageDiv>
          <CloseImage src={CloseIcon} alt="close" onClick={handleCloseFilter} />
        </CloseImageDiv>
      </IconFilter>
      <Content onChange={onChange}>
        <DateFilter>
          <DatePicker
            dateTitle="Nuo"
            displayTime="none"
            selected={selectedStart}
            handleChange={handleChangeStart}
            title="Pasirinkti pradžios datą"
            height="small"
          />
          <DatePicker
            dateTitle="Iki"
            displayTime="none"
            selected={selectedFinish}
            handleChange={handleChangeFinish}
            title="Pasirinkti pabaigos datą"
            height="small"
          />
        </DateFilter>
        <FilterContent>
          <h5>Kategorijos</h5>
          {checkedItems &&
            checkedItems.map((item, index) => {
              return (
                <CheckBoxDiv backgroundColor={item.value} key={index}>
                  <CheckBox
                    value={item.value}
                    name={index}
                    id={item.id}
                    label={item.text}
                    checked={item.isChecked}
                    handleCheckboxChange={handleOnChange}
                  />
                </CheckBoxDiv>
              );
            })}
        </FilterContent>
        <ClearButton
          handleClick={() => {
            handleClear();
            handleClearCheckbox();
          }}
          value="clear"
        >
          IŠVALYTI
        </ClearButton>
      </Content>
    </Wrapper>
  );
};

export default Filter;
