import { useState } from "react";

// Styles
import { Wrapper, Label, CheckInput, Span } from "./CheckBox.style";

const Checkbox = ({ label, value, id }) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <Wrapper>
      <Label htmlFor={id}>
        <CheckInput
          id={id}
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
          value={value}
        />
        <Span>{label}</Span>
      </Label>
    </Wrapper>
  );
};

export default Checkbox;
