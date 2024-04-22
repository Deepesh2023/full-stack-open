import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAllContacts = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addNewContact = (newContact) => {
  const request = axios.post(baseUrl, newContact);
  return request.then((response) => response.data);
};

export default {
  getAllContacts,
  addNewContact,
};
