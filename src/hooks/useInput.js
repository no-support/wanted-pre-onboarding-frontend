import { useState } from "react";

export const useInput = (initialValue, submitAction = () => {}) => {
  const [inputValue, setInputValue] = useState(initialValue);

  const updateValue = (newValue) => {
    setInputValue(newValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitAction(inputValue);
    updateValue(initialValue);
  };

  return { inputValue, updateValue, handleChange, handleSubmit };
};
/* --------------------------------- Example -------------------------------- */
// const { inputValue, updateValue, handleChange, handleSubmit } = useInput({
//   id: "",
//   pwd: "",
// });

// return (
//   <div className="App">
//     <form>
//       <input name="id" value={inputValue.id} onChange={handleChange} />
//       <input name="pwd" value={inputValue.pwd} onChange={handleChange} />

//       <button onClick={handleSubmit}>submit</button>
//     </form>
//   </div>
// );
