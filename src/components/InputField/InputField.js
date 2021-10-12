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
          ></TextArea>
        </Wrapper>
      );
    case "dropdown":
      return (
        <>
          <Label htmlFor={id}>{labelText}</Label>
          <Select
            id={id}
            name={selectName}
            defaultValue
            required={required}
            onChange={handleChange}
          >
            <option disabled value>
              Pasirinkti kategoriją
            </option>

            {options &&
              options.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.text}
                </option>
              ))}
          </Select>
        </>
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
