// date picker
import SingleDatePicker, { registerLocale } from "react-datepicker";
import lt from "date-fns/locale/lt";
import "react-datepicker/dist/react-datepicker.css";

// styles
import { Wrapper, DatePickerWrapper, CustomButton } from "./DatePicker.style";

registerLocale("lt", lt);

const DatePicker = ({
  timeTitle,
  dateTitle,
  placeholderTextTime,
  placeholderTextDate,
  selected,
  required,
  handleChange,
}) => {
  // fix meta ref error
  const CustomInput = ({ value, onClick }) => (
    <CustomButton onClick={onClick}>{value}</CustomButton>
  );

  return (
    <Wrapper>
      <DatePickerWrapper>
        <span>{dateTitle}</span>
        <SingleDatePicker
          placeholderText={placeholderTextDate}
          locale="lt"
          timeIntervals={1}
          dateFormat="yyyy/MM/dd"
          selected={selected}
          onChange={handleChange}
          required={required}
        />
      </DatePickerWrapper>
      <DatePickerWrapper>
        <span>{timeTitle}</span>
        <SingleDatePicker
          placeholderText={placeholderTextTime}
          locale="lt"
          timeCaption="Laikas"
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={1}
          dateFormat="HH:mm"
          selected={selected}
          onChange={handleChange}
          required={required}
          popperPlacement="left-end"
          customInput={<CustomInput />}
        />
      </DatePickerWrapper>
    </Wrapper>
  );
};

export default DatePicker;
