import { useState } from "react";

export const useModal = () => {
  const [show, setShow] = useState(false);

  const handleOpen = () => {
    setShow(!show);
  };

  return {
    handleOpen,
    show,
  };
};
