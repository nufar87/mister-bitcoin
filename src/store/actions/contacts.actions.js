import { contactService } from '../../services/contact.service';

export function loadContacts() {
  return async (dispatch, getState) => {
    try {
      const filterBy = getState().contactModule.filterBy;
      const contacts = await contactService.query(filterBy);
      dispatch({ type: 'SET_CONTACTS', contacts });
      return contacts;
    } catch (err) {
      console.log('err:', err);
    }
  };
}

export function removeContact(contactId) {
  return async (dispatch) => {
    try {
      const contacts = await contactService.delete(contactId);
      dispatch({ type: 'REMOVE_CONTACT', contactId });
      return contacts;
    } catch (err) {
      console.log('err:', err);
    }
  };
}

export function saveContact(contact) {
  return async (dispatch) => {
    try {
      const type = contact._id ? 'UPDATE_CONTACT' : 'ADD_CONTACT';
      console.log(type);
      contact = await contactService.save(contact);
      console.log(contact);
      dispatch({ type, contact });
      return contact;
    } catch (err) {
      console.log('err:', err);
    }
  };
}

export function setFilterBy(filterBy) {
  return (dispatch) => {
    try {
      dispatch({ type: 'SET_FILTER_BY', filterBy: { ...filterBy } });
    } catch (err) {
      console.log('err:', err);
    }
  };
}

export function getNeighbors(id) {
  return async (dispatch) => {
    try {
      const neighbors = await contactService.getNeighbors(id);
      dispatch({ type: 'SET_CONTACT', contact: neighbors.curr });
      return neighbors;
    } catch (err) {
      console.log('err:', err);
    }
  };
}
export function setContact(id) {
  return (dispatch) => {
    try {
      const contact = contactService.getById(id);
      dispatch({ type: 'SET_CONTACT', contact });
      return contact;
    } catch (err) {
      console.log('err:', err);
    }
  };
}
