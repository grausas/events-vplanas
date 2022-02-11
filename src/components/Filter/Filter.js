import { useState, useCallback } from "react";
// Styles
import {
  Wrapper,
  Content,
  FilterContent,
  DateFilter,
  ClearButton,
  CheckBoxDiv,
  FilterButton,
  ButtonDivs,
  // DayButton,
  Dropdown,
  ExpandImage,
  FilterDay,
} from "./Filter.style";
// components
import { CheckBox, DatePicker } from "../index";
//hooks
import { useOpenClose } from "../../hooks/useOpenClose";
import { useOpenCloseFilter } from "../../hooks/OpenFilter";
// icons
import ExpandIcon from "../../assets/icons/expandBlack.png";
import FilterIcon from "../../assets/icons/filter.png";

const Filter = ({
  data,
  onChange,
  selectedStart,
  selectedFinish,
  handleChangeStart,
  handleChangeFinish,
  handleClear,
}) => {
  const [checkedItems, setCheckeditems] = useState(data);
  const { handleOpen, show } = useOpenClose();
  const { handleOpenFilter, showFilter } = useOpenCloseFilter();

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
      <ButtonDivs>
        <FilterButton handleClick={handleOpen}>
          <img src={FilterIcon} alt="close-icon" />
          Filtras
        </FilterButton>
        {/* <DayButton>Šiandienos</DayButton>
        <DayButton>Mėnesio</DayButton> */}
        <FilterDay>
          <span>Dienos</span>
          <span>Svaitės</span>
          <span>Mėnesio</span>
        </FilterDay>
      </ButtonDivs>

      {show && (
        <Content onChange={onChange}>
          <DateFilter>
            <DatePicker
              dateTitle="Nuo"
              displayTime="none"
              selected={selectedStart}
              handleChange={handleChangeStart}
              title="Pasirinkti pradžios datą"
              height="small"
              placeholderTextDate="Nuo"
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
          <Dropdown onClick={handleOpenFilter}>
            Pasirinkti kategorijas
            <ExpandImage src={ExpandIcon} alt="close-icon" />
          </Dropdown>
          {showFilter && (
            <FilterContent>
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
              <ClearButton
                handleClick={() => {
                  handleClear();
                  handleClearCheckbox();
                }}
                value="clear"
              >
                IŠVALYTI
              </ClearButton>
            </FilterContent>
          )}
        </Content>
      )}
    </Wrapper>
  );
};

export default Filter;
