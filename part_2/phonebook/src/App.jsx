import { useState, useEffect } from "react";
import AddNewContact from "./AddNewContact";
import ContactsDisplay from "./ContactsDisplay";
import axios from "axios";

const App = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setContacts(response.data);
    });
  }, []);

  const [searchText, setSearchText] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);

  const searchTextDisply = (event) => {
    setSearchText(event.target.value);
    searchResults(event.target.value.toLowerCase());
  };

  const searchResults = (contactName) => {
    const results = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(contactName)
    );

    if (results.length == 0) {
      setFilteredContacts([{ name: "No contacts found", number: ":(", id: 0 }]);
    } else {
      setFilteredContacts(results);
    }
  };

  return (
    <>
      <Heading heading="Phonebook" />
      <form>
        <label>Filter shown with</label>
        <input value={searchText} onChange={searchTextDisply} />
      </form>
      <Heading heading="Add a new" />
      <AddNewContact
        contacts={contacts}
        setContacts={setContacts}
        setFilteredContacts={setFilteredContacts}
      />
      <Heading heading="Numbers" />
      <ContactsDisplay
        contacts={filteredContacts.length == 0 ? contacts : filteredContacts}
      />
    </>
  );
};

const Heading = ({ heading }) => {
  return <h1>{heading}</h1>;
};

export default App;
