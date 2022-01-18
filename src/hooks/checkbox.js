import { useState } from "react";

export const useCheckbox = () => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
  };

  return {
    handleCheckboxChange,
    checked,
  };
};
