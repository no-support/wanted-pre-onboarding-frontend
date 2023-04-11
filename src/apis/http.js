import axios from "axios";

const instance = axios.create({
  baseURL: "https://www.pre-onboarding-selection-task.shop",
  // cancelToken: axios.CancelToken.source().token,
  headers: {
    "Content-Type": "application/json",
    // Authorization: "Bearer " + localStorage.getItem("access_token"),
  },
});

export default instance;

// axios.defaults.baseURL = "https://www.pre-onboarding-selection-task.shop";
// axios.defaults.headers.post["Content-Type"] = "application/json";

// export { http };
