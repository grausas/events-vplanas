import { useState } from "react";

// Styles
import { Wrapper } from "./CheckBox.style";

const Checkbox = ({ label }) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <Wrapper>
      <label>{label}</label>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
      />
    </Wrapper>
  );
};

export default Checkbox;
