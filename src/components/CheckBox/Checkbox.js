// Styles
import { Wrapper, Label, CheckInput, Span } from "./CheckBox.style";

const Checkbox = ({
  label,
  value,
  id,
  color,
  checked,
  handleCheckboxChange,
  name,
  type,
}) => {
  return (
    <Wrapper>
      <Label htmlFor={id} color={color}>
        {label}
        <CheckInput
          id={id}
          type={type}
          checked={checked ? checked : false}
          onChange={handleCheckboxChange}
          value={value}
          name={name}
        />
        <Span color={color}></Span>
      </Label>
    </Wrapper>
  );
};

export default Checkbox;
