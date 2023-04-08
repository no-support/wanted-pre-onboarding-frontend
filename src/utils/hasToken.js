export const hasToken = () => {
  return localStorage.getItem("access_token") ? true : false;
};
