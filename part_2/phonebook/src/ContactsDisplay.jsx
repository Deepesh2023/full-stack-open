const ContactsDisplay = ({ contacts }) => {
  
  return (
    <div>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.name}: {contact.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactsDisplay;
