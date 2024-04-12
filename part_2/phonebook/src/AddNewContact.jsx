import { useState } from "react";

const AddNewContact = ({ contacts, setContacts }) => {
  const [newContact, setNewContact] = useState({ name: "", number: "" });

  const addNewContactButtonAction = (event) => {
    event.preventDefault();

    if (newContact.name === "" || newContact.number === "") {
      alert("Please fill both the fields");
      return;
    }

    const isContactDuplicate = contacts.some(
      (contact) => contact.name === newContact.name
    );

    if (isContactDuplicate) {
      alert(`${newContact.name} is already added to phonebook`);
      return;
    }

    const newContactObject = {
      name: newContact.name,
      number: newContact.number,
    };

    setContacts(contacts.concat(newContactObject));
    setNewContact({ name: "", number: "" });
  };

  const inputFieldDisply = (event) => {
    setNewContact({ ...newContact, [event.target.id]: event.target.value });
  };

  return (
    <form onSubmit={addNewContactButtonAction}>
      <TextInput
        fieldName="name"
        fieldValue={newContact.name}
        fieldOnChange={inputFieldDisply}
      />
      <TextInput
        fieldName="number"
        fieldValue={newContact.number}
        fieldOnChange={inputFieldDisply}
      />
      <button type="submit">Add</button>
    </form>
  );
};

const TextInput = ({ fieldName, fieldValue, fieldOnChange }) => {
  return (
    <div>
      <label htmlFor="name">{fieldName}</label>
      <input
        id={fieldName}
        type="text"
        value={fieldValue}
        onChange={fieldOnChange}
      />
    </div>
  );
};

export default AddNewContact;
