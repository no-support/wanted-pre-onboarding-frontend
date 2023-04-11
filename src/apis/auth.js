import http from "./http";

export const signup = async (inputValue) => {
  return http.post("/auth/signup", inputValue);
};

export const signin = async (inputValue) => {
  return http.post("/auth/signin", inputValue);
};
