import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newContact, setNewContact] = useState({ name: "", number: "" });

  const nameInputDisplay = (event) => {
    setNewContact({ ...newContact, [event.target.id]: event.target.value });
  };

  const addNewNameButtonAction = (event) => {
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewNameButtonAction}>
        <div>
          name:{" "}
          <input
            id="name"
            type="text"
            value={newContact.name}
            onChange={nameInputDisplay}
          />
        </div>
        <div>
          number:{" "}
          <input
            id="number"
            type="text"
            value={newContact.number}
            onChange={nameInputDisplay}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>
            {person.name}: {person.number}
          </li>
        ))}
      </ul>
      ...
    </div>
  );
};

export default App;
