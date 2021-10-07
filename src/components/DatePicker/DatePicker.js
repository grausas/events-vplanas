// date picker
import SingleDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// styles
import { Wrapper } from "./DatePicker.style";

const DatePicker = ({ selected, handleChange }) => {
  return (
    <Wrapper>
      <SingleDatePicker
        imeInputLabel="Laikas:"
        timeFormat="HH:mm"
        timeIntervals={1}
        dateFormat="yyyy/MM/dd HH:mm"
        showTimeSelect
        selected={selected}
        onChange={handleChange}
      />
    </Wrapper>
  );
};

export default DatePicker;
