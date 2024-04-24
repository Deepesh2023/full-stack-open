import { useState } from "react";
import ContactsDisplay from "./components/ContactsDisplay";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [filteredPersons, setFilteredContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: "", number: "" });
  const [searchText, setSearchText] = useState("");

  const newContactInputDisplay = (event) => {
    setNewContact({ ...newContact, [event.target.id]: event.target.value });
  };

  const searchInputDisplay = (event) => {
    const text = event.target.value;
    setSearchText(text);
    setFilteredContacts(
      persons.filter((person) =>
        person.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const addNewContactButtonAction = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newContact.name)) {
      alert(`${newContact.name} is already added to phonebook`);
      setNewContact({ name: "", number: "" });
      return;
    }

    if (newContact.name === "" || newContact.number === "") {
      return;
    }

    const newPersonObject = {
      name: newContact.name,
      number: newContact.number,
    };
    setPersons(persons.concat(newPersonObject));
    setNewContact({ name: "", number: "" });
  };

  const contacts = filteredPersons.length === 0 ? persons : filteredPersons;

  return (
    <div>
      <Heading heading={"Phonebook"} />
      <TextInput
        label={"Filter shown with: "}
        id="searchContacts"
        value={searchText}
        onChangeFunction={searchInputDisplay}
      />
      <Heading heading={"Add a new"} />
      <AddNewPersonForm
        onsubmitFunction={addNewContactButtonAction}
        nameDisplay={newContact.name}
        ContactsDisplay={newContact.number}
        onchangeFunction={newContactInputDisplay}
      />
      <Heading heading={"Numbers"} />
      <ContactsDisplay contacts={contacts} />
    </div>
  );
};

const Heading = ({ heading }) => {
  return (
    <>
      <h1>{heading}</h1>
    </>
  );
};

const TextInput = ({ label, id, value, onChangeFunction }) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" value={value} onChange={onChangeFunction} />
    </div>
  );
};

const AddNewPersonForm = ({
  onsubmitFunction,
  nameDisplay,
  numberDisplay,
  onchangeFunction,
}) => {
  return (
    <form onSubmit={onsubmitFunction}>
      <TextInput
        label={"Name: "}
        id="name"
        type="text"
        value={nameDisplay}
        onChangeFunction={onchangeFunction}
      />
      <TextInput
        label={"Number: "}
        id="number"
        type="text"
        value={numberDisplay}
        onChangeFunction={onchangeFunction}
      />
      <button type="submit">add</button>
    </form>
  );
};

export default App;
