// date picker
import SingleDatePicker, { registerLocale } from "react-datepicker";
import lt from "date-fns/locale/lt";
import "react-datepicker/dist/react-datepicker.css";

// styles
import { Wrapper, DatePickerWrapper } from "./DatePicker.style";

registerLocale("lt", lt);

const DatePicker = ({
  timeTitle,
  dateTitle,
  selected,
  handleChangeDate,
  handleChangeTime,
}) => {
  return (
    <Wrapper>
      <DatePickerWrapper>
        <span>{dateTitle}</span>
        <SingleDatePicker
          locale="lt"
          timeIntervals={1}
          dateFormat="yyyy/MM/dd"
          selected={selected}
          onChange={handleChangeDate}
        />
      </DatePickerWrapper>
      <DatePickerWrapper>
        <span>{timeTitle}</span>
        <SingleDatePicker
          locale="lt"
          timeInputLabel="Laikas:"
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={1}
          dateFormat="HH:mm"
          selected={selected}
          onChange={handleChangeTime}
        />
      </DatePickerWrapper>
    </Wrapper>
  );
};

export default DatePicker;
