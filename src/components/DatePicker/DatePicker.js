// date picker
import SingleDatePicker, { registerLocale } from "react-datepicker";
import lt from "date-fns/locale/lt";
import "react-datepicker/dist/react-datepicker.css";

// styles
import { Wrapper } from "./DatePicker.style";

registerLocale("lt", lt);

const DatePicker = ({ selected, handleChangeDate, handleChangeTime }) => {
  return (
    <Wrapper>
      <div>
        <span>Pradžios data</span>
        <SingleDatePicker
          locale="lt"
          timeInputLabel="Laikas:"
          timeCaption="Laikas"
          timeIntervals={1}
          dateFormat="yyyy/MM/dd"
          selected={selected}
          onChange={handleChangeDate}
        />
      </div>
      <div>
        <span>Pradžios laikas</span>
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
      </div>
    </Wrapper>
  );
};

export default DatePicker;
