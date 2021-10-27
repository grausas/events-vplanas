import { useState } from "react";

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoading = () => {
    setIsLoading(!isLoading);
  };

  return {
    handleLoading,
    isLoading,
  };
};
