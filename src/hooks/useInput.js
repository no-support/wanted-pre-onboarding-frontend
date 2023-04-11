import { useState } from "react";

// 질문: useInput 훅을 TodoEdit 컴포넌트에서도 사용하는 방법
// cancelAction이라는 매개변수를 추가하고,
// handleCancel 함수도 추가해서 그 안에서 cancelAction을 수행하는 방식으로
// 만들면 될까요? 감이 안 잡힙니다..
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
