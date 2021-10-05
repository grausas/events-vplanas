// Styles
import { Wrapper, Label, Input } from "./InputField.style";

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
  return (
    <Wrapper>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        defaultValue={defaultValue}
        onChange={handleChange}
      />
      {labelText && <Label htmlFor={id}>{labelText}</Label>}
    </Wrapper>
  );
};

export default InputField;
