const KEY_NAME = "cpvcodes";

const getAllCache = () => {
  return JSON.parse(localStorage.getItem(KEY_NAME)) ?? [];
};

const getCached = (code) => {
  let items = getAllCache();
  return items.find((item) => item.code === code);
};

const storeCache = (item) => {
  let items = getAllCache() ?? [];
  items.push(item);

  localStorage.setItem(KEY_NAME, JSON.stringify(items));
};

const removeCache = (code) => {
  let items = getAllCache();
  items = items.filter((item) => item.code !== code);

  localStorage.setItem(KEY_NAME, JSON.stringify(items));
};

const clearCache = () => {
  // localStorage.removeItem(KEY_NAME);
};

export { getAllCache, getCached, storeCache, removeCache, clearCache };
