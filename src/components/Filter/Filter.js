import { useState } from "react";

// Styles
import {
  Wrapper,
  Content,
  IconFilter,
  FilterContent,
  CloseImage,
  DateFilter,
} from "./Filter.style";
// hooks
import { useOpenClose } from "../../hooks/useOpenClose";
// Icons
import FilterIcon from "../../assets/icons/filter.png";
import CloseIcon from "../../assets/icons/close.png";
// components
import { CheckBox } from "../index";
import { DatePicker } from "../index";

// notes: onclick open filter by organization, date and type
// take info from data state and filter on map

const Filter = ({
  data,
  onChange,
  selectedStart,
  selectedFinish,
  handleChangeStart,
  handleChangeFinish,
}) => {
  const { handleOpen, show } = useOpenClose();
  // const [startDate, setStartDate] = useState(new Date());
  // const [finishDate, setFinishDate] = useState(new Date());

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
          <DateFilter>
            <DatePicker
              placeholderTextDate="Pasirinkti pradžios datą"
              dateTitle="Pradžios data"
              displayTime="none"
              selected={selectedStart}
              handleChange={handleChangeStart}
            />
            <DatePicker
              placeholderTextDate="Pasirinkti pradžios datą"
              dateTitle="Pabaigos data"
              displayTime="none"
              selected={selectedFinish}
              handleChange={handleChangeFinish}
            />
          </DateFilter>
          <h5>Kategorijos</h5>
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
