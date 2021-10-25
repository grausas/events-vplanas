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
  displayTime,
  onChangeRaw,
  title,
}) => {
  const CustomInput = forwardRef(({ onChange, onClick, value }, ref) => (
    // <CustomButton
    //   onChange={onChange}
    //   // onClick={onClick}
    //   readOnly={true}
    //   ref={ref}
    // >
    //   {console.log("value", value)}
    //   {value.length > 0 ? value : title}
    // </CustomButton>
    <CustomButton
      // onChange={onChange}
      readOnly={true}
      onClick={onClick}
      ref={ref}
      value={value}
      // type="text"
    />
  ));

  const handleChangeRaw = (e) => {
    console.log("raw", e.target, e.target.value, e.target.text);
  };

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
          onChange={(value, e) => handleChange(value, e)}
          required={required}
          customInput={<CustomInput />}
          onChangeRaw={handleChangeRaw}
        />
      </DatePickerWrapper>
      <DatePickerWrapper display={displayTime}>
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
