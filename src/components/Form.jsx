import { signup, signin } from "../apis/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInput } from "../hooks/index";
import { hasToken, isValidEmail, isValidPassword } from "../utils";

// 질문: Form 컴포넌트를 사용하는 페이지 컴포넌트가 Signin과 Signup 두 개일 뿐이라서
// signin이냐 signup으로 분기 처리를 하고 있는데,
// 앞으로 더 많은 곳에서도 재사용되기 위해선 어떻게 하는 것이 좋을까요?
const Form = ({ testId }) => {
  const navigate = useNavigate();

  // 질문: dependencie 배열에 navigate를 넣으라는 권고가 뜨는데, 왜 넣어야 하는지 모르겠습니다(Todo.jsx도 동일)
  useEffect(() => {
    hasToken() && navigate("/todo");
  }, []);

  const submitAction = async (inputValue) => {
    try {
      if (testId === "signin") {
        const res = await signin(inputValue);
        localStorage.setItem("access_token", res.data.access_token);
        navigate("/todo");
      } else if (testId === "signup") {
        await signup(inputValue);
        navigate("/signin");
      }
    } catch (err) {
      const { error, message, statusCode } = err.response.data;
      alert(message);
    }
  };

  const { inputValue, handleChange, handleSubmit } = useInput(
    {
      email: "",
      password: "",
    },
    submitAction
  );

  const inputs = [
    {
      type: "text",
      name: "email",
      id: "email",
      "data-testid": "email-input",
      label: "이메일",
      placeholder: "이메일을 입력하세요.",
      errorMessage: "이메일 형태가 아닙니다.",
    },
    {
      type: "password",
      name: "password",
      id: "password",
      "data-testid": "password-input",
      label: "비밀번호",
      placeholder: "비밀번호를 입력하세요.",
      errorMessage: "비밀번호는 8자 이상이어야 합니다.",
    },
  ];

  return (
    <div className="Form">
      <form>
        {inputs.map((input) => {
          const {
            type,
            name,
            id,
            "data-testid": dataTestId,
            label,
            placeholder,
            errorMessage,
          } = input;
          return (
            <div key={name}>
              <label htmlFor={id}>{label}</label>
              <input
                type={type}
                name={name}
                id={id}
                data-testid={dataTestId}
                placeholder={placeholder}
                value={inputValue[name]}
                onChange={handleChange}
              />
            </div>
          );
        })}
        <button
          disabled={
            isValidEmail(inputValue.email) &&
            isValidPassword(inputValue.password)
              ? false
              : true
          }
          data-testid={`${testId}-button`}
          onClick={handleSubmit}
        >
          {testId === "signin" ? "로그인" : "회원가입"}
        </button>
      </form>
    </div>
  );
};
export default Form;
