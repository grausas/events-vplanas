import { useState } from "react";

export const useOpenClose = () => {
  const [show, setShow] = useState(false);

  const handleOpen = () => {
    setShow(!show);
  };

  return {
    handleOpen,
    show,
  };
};
