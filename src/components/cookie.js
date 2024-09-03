import Cookies from 'js-cookie';

export const setCookie = (name, value, minutes) => {
  const expires = new Date(new Date().getTime() + minutes * 60 * 1000);
  Cookies.set(name, value, { expires });
};

export const getCookie = (name) => {
  return Cookies.get(name);
};

export const removeCookie = (name) => {
  Cookies.remove(name);
};
