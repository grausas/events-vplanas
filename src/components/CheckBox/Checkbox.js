// Styles
import { Wrapper, Label, CheckInput, Span } from "./CheckBox.style";
// hooks
import { useCheckbox } from "../../hooks/checkbox";

const Checkbox = ({ label, value, id, color }) => {
  const { checked, handleCheckboxChange } = useCheckbox();

  return (
    <Wrapper>
      <Label htmlFor={id} color={color}>
        {label}
        <CheckInput
          id={id}
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
          value={value}
        />
        <Span color={color}></Span>
      </Label>
    </Wrapper>
  );
};

export default Checkbox;
