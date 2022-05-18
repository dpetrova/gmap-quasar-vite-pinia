import { boot } from "quasar/wrappers";
import axios from "axios";

const api = axios.create({
  baseURL: `https://api.zippopotam.us`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// handle response
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default boot(({ app, store }) => {
  app.provide("axios", api);
  store.use(() => ({ api }));
});

export { api };
