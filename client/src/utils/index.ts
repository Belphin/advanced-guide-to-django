export const getInternalToken = () => {
  const data = localStorage.getItem("token") || sessionStorage.getItem("token");
  const token = (data && JSON.parse(data).token) || "";
  return token;
};
