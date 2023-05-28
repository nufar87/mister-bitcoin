import { storageService } from './localstorage.service';

export const contactService = {
  query: getContacts,
  getById: getContactById,
  delete: deleteContact,
  save: saveContact,
  getEmpty: getEmptyContact,
  getNeighbors,
  makeId: _makeId,
};
const KEY = 'contactDB';
var gContacts = require('./contact.json');
function sort(arr) {
  return arr.sort((a, b) => {
    if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
      return -1;
    }
    if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
      return 1;
    }
    return 0;
  });
}

function getContacts(filterBy = null) {
  return new Promise((resolve, reject) => {
    var contactsToReturn = storageService.loadFromStorage(KEY) || gContacts;
    if (filterBy && filterBy.term) {
      contactsToReturn = filter(filterBy.term);
    }
    storageService.saveToStorage(KEY, contactsToReturn);

    resolve(sort(contactsToReturn));
  });
}

function getContactById(id) {
  return new Promise((resolve, reject) => {
    var contacts = storageService.loadFromStorage(KEY) || gContacts;

    const contact = contacts.find((contact) => contact._id === id);
    contact ? resolve(contact) : reject(`Contact id ${id} not found!`);
  });
}

function deleteContact(id) {
  return new Promise((resolve, reject) => {
    var contacts = storageService.loadFromStorage(KEY) || gContacts;

    const index = contacts.findIndex((contact) => contact._id === id);
    if (index !== -1) {
      contacts.splice(index, 1);
    }
    storageService.saveToStorage(KEY, contacts);
    resolve(contacts);
  });
}

function _updateContact(contact) {
  return new Promise((resolve, reject) => {
    var contacts = storageService.loadFromStorage(KEY) || gContacts;

    const index = contacts.findIndex((c) => contact._id === c._id);
    if (index !== -1) {
      contacts[index] = contact;
    }
    storageService.saveToStorage(KEY, contacts);

    resolve(contact);
  });
}

function _addContact(contact) {
  return new Promise((resolve, reject) => {
    var contacts = storageService.loadFromStorage(KEY) || gContacts;
    contact._id = _makeId();
    contacts.unshift(contact);
    storageService.saveToStorage(KEY, contacts);

    resolve(contact);
  });
}

function saveContact(contact) {
  return contact._id ? _updateContact(contact) : _addContact(contact);
}

function getEmptyContact() {
  return {
    name: '',
    email: '',
    phone: '',
  };
}

function filter(term) {
  var contacts = storageService.loadFromStorage(KEY) || gContacts;
  term = term.toLocaleLowerCase();
  return contacts.filter((contact) => {
    return (
      contact.name.toLocaleLowerCase().includes(term) ||
      contact.phone.toLocaleLowerCase().includes(term) ||
      contact.email.toLocaleLowerCase().includes(term)
    );
  });
}

function _makeId(length = 10) {
  var txt = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function getNeighbors(id) {
  var contacts = storageService.loadFromStorage(KEY) || gContacts;

  return new Promise((resolve, reject) => {
    const idx = contacts.findIndex((contact) => contact._id === id);
    const res = {
      prev: idx ? contacts[idx - 1] : contacts[contacts.length - 1],
      curr: contacts[idx] || null,
      next: idx === contacts.length - 1 ? contacts[0] : contacts[idx + 1],
    };
    idx !== -1 ? resolve(res) : reject(`Contact id ${id} not found!`);
  });
}
