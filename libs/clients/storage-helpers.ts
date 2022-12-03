export const setAccessTokenIntoSession = (accessToken: string) => {
  sessionStorage.setItem("access-token", accessToken);
};
export const clearAccessTokenFromSession = () => {
  sessionStorage.removeItem("access-token");
};
export const getAccessTokenFromSession = () =>
  sessionStorage.getItem("access-token");
