// date picker
import SingleDatePicker, { registerLocale } from "react-datepicker";
import lt from "date-fns/locale/lt";
import "react-datepicker/dist/react-datepicker.css";

// styles
import { Wrapper } from "./DatePicker.style";

registerLocale("lt", lt);

const DatePicker = ({ selected, handleChange }) => {
  return (
    <Wrapper>
      <SingleDatePicker
        locale="lt"
        timeInputLabel="Laikas:"
        timeCaption="Laikas"
        //   showMonthDropdown
        //   showYearDropdown
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={1}
        dateFormat="yyyy/MM/dd HH:mm"
        show
        selected={selected}
        onChange={handleChange}
        dropdownMode="select"
      />
    </Wrapper>
  );
};

export default DatePicker;
