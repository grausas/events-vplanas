import { useState } from "react";

// Styles
import { Wrapper, Label, CheckInput, Span } from "./CheckBox.style";

const Checkbox = ({ label, value, id, handleValue }) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <Wrapper>
      <Label htmlFor={id}>
        {label}
        <CheckInput
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => {
            handleCheckboxChange(e);
            handleValue(e);
          }}
          value={value}
        />
        <Span></Span>
      </Label>
    </Wrapper>
  );
};

export default Checkbox;
