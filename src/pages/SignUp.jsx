import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { hasToken, isValidEmail, isValidPassword } from "../utils/index";

const baseUrl = "https://www.pre-onboarding-selection-task.shop";

const SignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    hasToken() && navigate("/todo");
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const isValid = validEmail && validPassword;

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    isValidEmail(value) ? setValidEmail(true) : setValidEmail(false);
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    isValidPassword(value) ? setValidPassword(true) : setValidPassword(false);
  };

  const signUp = () => {
    axios
      .post(baseUrl + "/" + "auth/signup", {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        navigate("/signin");
      })
      .catch((err) => {
        const { error, message, statusCode } = err.response.data;
        console.log(error, message, statusCode);
        alert(message);
      });
  };

  const SubmitHandle = () => {
    signUp();
  };

  return (
    <div className="SignUp">
      <form>
        <input
          type="text"
          name="email"
          id="email"
          data-testid="email-input"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          data-testid="password-input"
          value={password}
          onChange={handlePasswordChange}
        />
        <button
          disabled={!isValid}
          type="button"
          data-testid="signup-button"
          onClick={SubmitHandle}
        >
          회원가입
        </button>
      </form>
    </div>
  );
};
export default SignUp;
