import { useState } from "react";
import ContactDisplay from "./ContactDisplay";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addNewNameButtonAction = (event) => {
    event.preventDefault();

    const isNameDuplicated = persons.some((person) => person.name === newName);

    if (isNameDuplicated) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      return;
    }

    const newPersonObject = {
      name: newName,
    };

    setPersons(persons.concat(newPersonObject));
    setNewName("");
  };

  const newNameDisplay = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewNameButtonAction}>
        <div>
          name: <input value={newName} onChange={newNameDisplay} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <ContactDisplay key={person.name} name={person.name} />
        ))}
      </ul>
      ...
    </div>
  );
};

export default App;
