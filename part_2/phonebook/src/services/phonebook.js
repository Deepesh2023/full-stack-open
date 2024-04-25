import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const post = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then((response) => response.data);
};

const update = (updatedPerson) => {
  const request = axios.put(`${baseUrl}/${updatedPerson.id}`, updatedPerson);
  return request.then((response) => response.data);
};

const deleteContact = (personId) => {
  const request = axios.delete(`${baseUrl}/${personId}`);
  return request.then((response) => response.data);
};

export default {
  getAll,
  post,
  update,
  deleteContact,
};
