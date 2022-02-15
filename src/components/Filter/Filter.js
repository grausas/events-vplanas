import { useState, useCallback, useRef, useEffect } from "react";
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
  Dropdown,
  ExpandImage,
  FilterDay,
  DropdownButton,
} from "./Filter.style";
// components
import { CheckBox, DatePicker } from "../index";
//hooks
import { useOpenClose } from "../../hooks/useOpenClose";
import { useOpenCloseFilter } from "../../hooks/OpenFilter";
// icons
import ExpandIcon from "../../assets/icons/expandBlack.png";
import CollapseIcon from "../../assets/icons/collapse.png";

const Filter = ({
  data,
  onChange,
  selectedStart,
  selectedFinish,
  handleChangeStart,
  handleChangeFinish,
  handleClear,
  handleOpenMore,
}) => {
  const [checkedItems, setCheckeditems] = useState(data);
  const { handleOpen, show } = useOpenClose();
  const { handleOpenFilter, showFilter } = useOpenCloseFilter();

  const ref = useRef(null);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (showFilter && ref.current && !ref.current.contains(e.target)) {
        handleOpenFilter(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showFilter]);

  const checkedCount = checkedItems.filter(
    (item) => item.isChecked === true
  ).length;

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
        <FilterButton handleClick={handleOpen}>Filtrai</FilterButton>
        <FilterDay>
          <span onClick={handleOpenMore}>Dienos</span>
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
          <Dropdown ref={ref}>
            <DropdownButton handleClick={handleOpenFilter}>
              <ExpandImage
                src={showFilter === false ? ExpandIcon : CollapseIcon}
                alt="close-icon"
              />
              {checkedCount > 1
                ? `${checkedCount} pasirinktos kategorijos` +
                  (
                    <span
                      onClick={() => {
                        handleClear();
                        handleClearCheckbox();
                      }}
                    >
                      X
                    </span>
                  )
                : checkedCount === 1
                ? `${checkedCount} pasirinkta kategorija`
                : "Pasirinkti kategorijas"}
            </DropdownButton>
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
          </Dropdown>
        </Content>
      )}
    </Wrapper>
  );
};

export default Filter;
