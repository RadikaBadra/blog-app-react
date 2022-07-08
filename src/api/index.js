import { $fetch } from "ohmyfetch";

const api = $fetch.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

export default api;
