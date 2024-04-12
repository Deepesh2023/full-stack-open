import { useState } from "react";
import AddNewContact from "./AddNewContact";
import ContactsDisplay from "./ContactsDisplay";

const App = () => {
  const [contacts, setContacts] = useState([]);

  return (
    <>
      <Heading heading="Phonebook" />
      <AddNewContact contacts={contacts} setContacts={setContacts} />
      <Heading heading="Numbers" />
      <ContactsDisplay contacts={contacts} />
    </>
  );
};

const Heading = ({ heading }) => {
  return <h1>{heading}</h1>;
};

export default App;
