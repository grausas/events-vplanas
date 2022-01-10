import { useState } from "react";

export const useOpenCloseModal = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  return {
    handleOpenModal,
    openModal,
  };
};
