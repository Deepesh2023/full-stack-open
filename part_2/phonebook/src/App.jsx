import { useState } from "react";
import AddNewContact from "./AddNewContact";
import ContactsDisplay from "./ContactsDisplay";

const App = () => {
  const [contacts, setContacts] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

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
