export const logout = () => {
  localStorage.removeItem("accessToken");
  window.location.href = "/login";
};

export const checkAuth = () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    logout();
  }
};
