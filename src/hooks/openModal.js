import { useState } from "react";

export const useOpenClose = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(!openModal);
  };

  return {
    handleOpen,
    openModal,
  };
};
