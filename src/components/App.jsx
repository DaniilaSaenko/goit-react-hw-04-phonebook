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

    const addContact = data => {
    data.preventDefault();
    const {
      elements: { name, number },
    } = data.currentTarget;

    let addedContact = {
      name: name.value,
      number: number.value,
      id: nanoid(),
    };

    let isAdded = false;

    contacts.map(contact => {
      if (contact.name === name.value) {
        alert(`${name.value} is already in contacts`);
        return (isAdded = true);
      }
      return isAdded;
    });

  
    if (!isAdded) {
      setContacts([addedContact, ...contacts]);
      data.currentTarget.reset();
    }
  };


  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
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

  return (
    <Box px={20} pt={10}>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />

      {contacts.length !== 0 && (
        <Box mt={20}>
          <h2>Contacts</h2>
          <Filter value={filter} onChange={changeFilter} />
          <ContactList contacts={getVisibleContacts()} onDelete={deleteContact} />
        </Box>
      )}
    </Box>
  );
}