import axios from "axios";

export const create = () => {
  return axios.post("/api/lobbies/create");
};

export const join = id => {
  return axios.post(`/api/lobbies/join/${id}`);
};

export const leave = id => {
  return axios.delete(`/api/lobbies/leave/${id}`);
};
