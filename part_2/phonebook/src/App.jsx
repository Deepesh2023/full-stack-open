import { useState, useEffect } from "react";
import ContactsDisplay from "./components/ContactsDisplay";
import phonebook from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: "", number: "" });
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    phonebook.getAll().then((persons) => setPersons(persons));
  }, []);

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

    if (checkIfNameAndNumberPresent()) {
      alert(`${newContact.name} is already added to phonebook`);
      setNewContact({ name: "", number: "" });
      return;
    }

    if (checkIfOnlyNameIsSame()) {
      if (
        confirm(
          `${newContact.name} is already added to phonebook, replace the old number with new one?`
        )
      ) {
        const person = persons.find(
          (person) => person.name === newContact.name
        );

        const updatedContact = { ...person, number: newContact.number };

        phonebook.update(updatedContact).then((updatedContact) => {
          setPersons(
            persons.map((person) =>
              person.id === updatedContact.id ? updatedContact : person
            )
          );
          setNewContact({ name: "", number: "" });
        });
      }
      return;
    }

    if (newContact.name === "" || newContact.number === "") {
      return;
    }

    const newPersonObject = {
      name: newContact.name,
      number: newContact.number,
    };

    phonebook.post(newPersonObject).then((newPerson) => {
      setPersons(persons.concat(newPerson));
    });

    setNewContact({ name: "", number: "" });
  };

  const deleteContact = (person) => {
    return () => {
      if (confirm(`Delete ${person.name}?`)) {
        phonebook.deleteContact(person.id).then((deletedContact) => {
          setPersons(
            persons.filter((person) => person.id !== deletedContact.id)
          );
        });
      }
      return;
    };
  };

  const checkIfNameAndNumberPresent = () => {
    return persons.some(
      (person) =>
        person.name === newContact.name && person.number === newContact.number
    );
  };

  const checkIfOnlyNameIsSame = () => {
    return persons.some((person) => person.name === newContact.name);
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
        numberDisplay={newContact.number}
        onchangeFunction={newContactInputDisplay}
      />
      <Heading heading={"Numbers"} />
      <ContactsDisplay contacts={contacts} deleteButtonAction={deleteContact} />
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
