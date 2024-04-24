const ContactsDisplay = ({ contacts, deleteButtonAction }) => {
  return (
    <ul>
      {contacts.map((person) => (
        <li key={person.id}>
          {person.name}: {person.number}
          <button onClick={deleteButtonAction(person)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ContactsDisplay;
