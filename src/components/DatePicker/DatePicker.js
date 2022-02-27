import React, { forwardRef } from "react";

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
  handleChangeTime,
  displayTime,
  height,
}) => {
  const CustomInput = forwardRef(({ onClick, value }, ref) => (
    <CustomButton readOnly onClick={onClick} ref={ref} value={value} />
  ));

  return (
    <Wrapper>
      <DatePickerWrapper height={height}>
        <span>{dateTitle}</span>
        <SingleDatePicker
          wrapperClassName="date-picker"
          portalId="root-portal"
          placeholderText={placeholderTextDate}
          locale="lt"
          timeIntervals={1}
          dateFormat="yyyy/MM/dd"
          selected={selected}
          onChange={handleChange}
          required={required}
          customInput={<CustomInput />}
          dateFormatCalendar=" "
          minDate={
            new Date(new Date().setFullYear(new Date().getFullYear() - 1))
          }
          maxDate={
            new Date(new Date().setFullYear(new Date().getFullYear() + 2))
          }
          showMonthDropdown
          showMonth
          showPopperArrow={false}
          showYearDropdown
          dropdownMode="select"
          adjustDateOnChange
        />
      </DatePickerWrapper>
      <DatePickerWrapper display={displayTime} height={height}>
        <span>{timeTitle}</span>
        <SingleDatePicker
          portalId="root-portal"
          placeholderText={placeholderTextTime}
          locale="lt"
          timeCaption="Laikas"
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={5}
          dateFormat="HH:mm"
          selected={selected}
          onChange={handleChangeTime}
          required={required}
          popperPlacement="left-end"
          showPopperArrow={false}
        />
      </DatePickerWrapper>
    </Wrapper>
  );
};

export default DatePicker;
