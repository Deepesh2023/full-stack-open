const ContactDisplay = ({ contacts }) => {
  console.log(contacts);

  return (
    <div>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.name}>
            {contact.name}: {contact.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactDisplay;
