import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInput } from "../hooks/index";
import { hasToken, isValidEmail, isValidPassword } from "../utils";

const Form = ({ testId }) => {
  const navigate = useNavigate();

  useEffect(() => {
    hasToken() && navigate("/todo");
  }, []);

  const { inputValue: email, handleChange: handleEmailChange } = useInput("");
  const { inputValue: password, handleChange: handlePasswordChange } =
    useInput("");

  const [hasSubmit, setHasSubmit] = useState(false);

  useEffect(() => {
    if (!hasSubmit) return;
    const cancelToken = axios.CancelToken.source();

    if (testId === "signin-button") {
      signIn(cancelToken);
    } else if (testId === "signup-button") {
      signUp(cancelToken);
    }

    return () => {
      cancelToken.cancel();
    };
  }, [hasSubmit, testId]);

  const signIn = (cancelToken) => {
    axios
      .post(
        process.env.REACT_APP_API_URL + "/" + "auth/signin",
        {
          email,
          password,
        },
        { cancelToken: cancelToken.token }
      )
      .then((res) => {
        localStorage.setItem("access_token", res.data.access_token);
        navigate("/todo");
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          const { code, message, name } = err;
          console.log(message);
          return;
        }
        const { error, message, statusCode } = err.response.data;
        console.log(error, message, statusCode);
        alert(message);
      });
  };

  const signUp = (cancelToken) => {
    axios
      .post(
        process.env.REACT_APP_API_URL + "/" + "auth/signup",
        {
          email,
          password,
        },
        { cancelToken: cancelToken.token }
      )
      .then((res) => {
        console.log(res);
        navigate("/signin");
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          const { code, message, name } = err;
          console.log(message);
          return;
        }
        const { error, message, statusCode } = err.response.data;
        console.log(error, message, statusCode);
        alert(message);
      });
  };

  const handleSubmit = () => {
    setHasSubmit(true);
  };

  return (
    <div className="Form">
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
          disabled={
            isValidEmail(email) && isValidPassword(password) ? false : true
          }
          type="button"
          data-testid={testId}
          onClick={handleSubmit}
        >
          회원가입
        </button>
      </form>
    </div>
  );
};
export default Form;
