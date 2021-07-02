export const getObjFromLocalStorage = function (name) {
  const obj = localStorage.getItem(name);
  return obj ? JSON.parse(obj) : null;
};
export const setObjToLocalStorage = function (name, data) {
  localStorage.setItem(name, data);
};
