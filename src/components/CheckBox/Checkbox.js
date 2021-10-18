import { useState } from "react";

// Styles
import { Wrapper, CheckInput } from "./CheckBox.style";

const Checkbox = ({ label, value, id }) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    // console.log(e.target.checked);
    // console.log(e.target.value);
    setChecked(e.target.checked);
  };

  return (
    <Wrapper>
      <CheckInput
        id={id}
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
        value={value}
      />
      <label htmlFor={id}>{label}</label>
    </Wrapper>
  );
};

export default Checkbox;
