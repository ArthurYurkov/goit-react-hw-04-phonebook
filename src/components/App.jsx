import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import styles from './App.module.css';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import Notification from './Notification/Notification';

function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const normalizedName = name.toLowerCase();

    let isAdded = false;
    contacts.forEach(el => {
      if (el.name.toLowerCase() === normalizedName) {
        alert(`${name} is already in contacts`);
        isAdded = true;
      }
    });

    if (isAdded) {
      return;
    }
    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    setContacts(prevContacts => [...prevContacts, contact]);
  };

  function changeFilter(e) {
    setFilter(e.currentTarget.value.trim());
  }

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = todoId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== todoId)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <div className={styles.container}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <h2 className={styles.titleContacts}>Contacts</h2>
      <div className={styles.allContacts}>All contacts: {contacts.length}</div>
      {contacts.length > 0 ? (
        <>
          <Filter value={filter} onChange={changeFilter} />
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={deleteContact}
          />
        </>
      ) : (
        <Notification message="Local storage is empty" />
      )}
    </div>
  );
}

export default App;
