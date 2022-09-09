import api from "./apiService";

const searchCpv = (key) => api.get("search/" + key);

const getCpv = (data) => api.get("tree/" + data);

export { searchCpv, getCpv };
