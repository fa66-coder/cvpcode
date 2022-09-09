import axios from "axios";

const BASEURL = "http://localhost:8000/api/cpv";

const instance = axios.create({
  baseURL: BASEURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});


export default instance;