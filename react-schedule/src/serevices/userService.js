import jwtDecode from "jwt-decode";

const tokenKey = 'token';

function isTokenValid(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const payload = JSON.parse(window.atob(base64));
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}




export const getCurrentUser = () => {
  try {
    const decode = jwtDecode(localStorage.getItem(tokenKey));
    if (decode.exp && Date.now() >= decode.exp * 1000) {
      return false;
    }

    return decode;

  } catch (err) {
    return null
  }
}