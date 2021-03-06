// Styles
import { Wrapper, Label, Input, TextArea, Select } from "./InputField.style";

const InputField = ({
  type,
  labelText,
  placeholder,
  required,
  minLength,
  id,
  options,
  selectName,
  maxLength,
  handleChange,
  value,
  defaultValue,
}) => {
  switch (type) {
    case "longtext":
      return (
        <Wrapper>
          {labelText && <Label htmlFor={id}>{labelText}</Label>}
          <TextArea
            id={id}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={handleChange}
            minLength={minLength}
            maxLength={maxLength}
            required={required}
            value={value}
          ></TextArea>
        </Wrapper>
      );
    case "dropdown":
      return (
        <Wrapper>
          <Label htmlFor={id}>{labelText}</Label>
          <Select
            id={id}
            name={selectName}
            required={required}
            onChange={handleChange}
            defaultValue={defaultValue}
          >
            <option disabled value>
              Pasirinkti kategorijÄ…
            </option>

            {options &&
              options.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.text}
                </option>
              ))}
          </Select>
        </Wrapper>
      );

    default:
      return (
        <Wrapper>
          {labelText && <Label htmlFor={id}>{labelText}</Label>}
          <Input
            id={id}
            type="text"
            placeholder={placeholder}
            required={required}
            minLength={minLength}
            maxLength={maxLength}
            defaultValue={defaultValue}
            onChange={handleChange}
          />
        </Wrapper>
      );
  }
};

export default InputField;
