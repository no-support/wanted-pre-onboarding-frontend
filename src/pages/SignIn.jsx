import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { hasToken, isValidEmail, isValidPassword } from "../utils/index";

const baseUrl = "https://www.pre-onboarding-selection-task.shop";

const SignIn = () => {
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

  const login = () => {
    axios
      .post(baseUrl + "/" + "auth/signin", {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data.access_token);
        localStorage.setItem("access_token", res.data.access_token);
        navigate("/todo");
      })
      .catch((err) => {
        const { error, message, statusCode } = err.response.data;
        console.log(error, message, statusCode);
        alert(message);
      });
  };

  const SubmitHandle = () => {
    login();
  };

  return (
    <div className="SignIn">
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
          data-testid="signin-button"
          onClick={SubmitHandle}
        >
          로그인
        </button>
      </form>
    </div>
  );
};
export default SignIn;
