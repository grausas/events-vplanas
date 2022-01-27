import { useState } from "react";

export const useOpenCloseFilter = () => {
  const [showFilter, setShowFilter] = useState(false);

  const handleOpenFilter = () => {
    setShowFilter(!showFilter);
  };

  return {
    handleOpenFilter,
    showFilter,
  };
};
