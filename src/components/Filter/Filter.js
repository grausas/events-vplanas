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
  return (
    <Wrapper>
      <IconFilter>
        <CloseImageDiv>
          <CloseImage src={CloseIcon} alt="close" onClick={handleCloseFilter} />
        </CloseImageDiv>
      </IconFilter>
      <Content>
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
        <FilterContent onChange={onChange}>
          <h5>Kategorijos</h5>
          {data &&
            data.map((item) => {
              return (
                <CheckBoxDiv backgroundColor={item.value} key={item.id}>
                  <CheckBox value={item.value} id={item.id} label={item.text} />
                </CheckBoxDiv>
              );
            })}
        </FilterContent>
        <ClearButton handleClick={handleClear} value="clear">
          IŠVALYTI
        </ClearButton>
      </Content>
    </Wrapper>
  );
};

export default Filter;
