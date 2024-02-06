const useLogin = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const setToken = (token) => {
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("token", token);
  };

  return { isLoggedIn, setToken };
};

export default useLogin;
