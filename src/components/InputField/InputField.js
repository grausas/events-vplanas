// Styles
import { Label, Input } from "./InputField.style";

const InputField = ({
  type,
  labelText,
  placeholder,
  required,
  minLength,
  maxLength,
  handleChange,
  defaultValue,
}) => {
  return (
    <div>
      <Label>{labelText}</Label>
      <div>
        <Input
          type={type}
          placeholder={placeholder}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          defaultValue={defaultValue}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default InputField;
