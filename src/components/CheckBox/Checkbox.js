import { useState } from "react";

// Styles
import { Wrapper, CheckInput } from "./CheckBox.style";

const Checkbox = ({ label, value }) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <Wrapper>
      <label>{label}</label>
      <CheckInput
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
        value={value}
      />
    </Wrapper>
  );
};

export default Checkbox;
