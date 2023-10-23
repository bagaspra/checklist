import axios from 'axios';

export const axiosWithAuth = (token) => {
  return axios.create({
    baseURL: 'http://94.74.86.174:8080/api',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
