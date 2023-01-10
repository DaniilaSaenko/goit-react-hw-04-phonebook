import { useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import { Box } from './Box';
import { useLocalStorage } from './Hooks/useLocalStorage';


export const App = () =>{
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContacts = data => {
    
    const { contactName: name, contactNumber: number } = data;

    const contact = {
      id: nanoid(),
      name: name,
      number: number.toString(),
    };

    const contactsInclude = contacts.some(elem => elem.name === name);

    if (contactsInclude) {
      alert(`${name} is already in contacts`);
      return;
    }

    setContacts(prevState => [...prevState, contact]);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    if (filter.length === 0) {
      return contacts;
    } else {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );
    }
  };

  const visibleContacts = getVisibleContacts();

  return (
    <Box px={20} pt={10}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContacts} contacts={contacts} />

      {contacts.length !== 0 && (
        <Box mt={20}>
          <h2>Contacts</h2>
          <Filter value={filter} onChange={changeFilter} />
          <ContactList contacts={visibleContacts} onDelete={deleteContact} />
        </Box>
      )}
    </Box>
  );
}