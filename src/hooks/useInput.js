import { useState } from "react";

export const useInput = (initialValue, submitAction) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    setInputValue(initialValue);
    submitAction(inputValue);
  };

  return { inputValue, handleChange, handleSubmit };
};
