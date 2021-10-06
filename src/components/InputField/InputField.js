// Styles
import { Wrapper, Label, Input, TextArea } from "./InputField.style";

const InputField = ({
  type,
  labelText,
  placeholder,
  required,
  minLength,
  id,
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
            onChange={handleChange}
            minLength={minLength}
            maxLength={maxLength}
            required={required}
          ></TextArea>
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
