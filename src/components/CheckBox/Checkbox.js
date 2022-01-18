// Styles
import { Wrapper, Label, CheckInput, Span } from "./CheckBox.style";
// hooks
import { useCheckbox } from "../../hooks/checkbox";

const Checkbox = ({ label, value, id }) => {
  const { checked, handleCheckboxChange } = useCheckbox();

  return (
    <Wrapper>
      <Label htmlFor={id}>
        {label}
        <CheckInput
          id={id}
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
          value={value}
        />
        <Span></Span>
      </Label>
    </Wrapper>
  );
};

export default Checkbox;
