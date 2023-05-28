import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { loadContacts, setFilterBy } from '../store/actions/contacts.actions';

import { ContactList } from '../cmps/ContactList.jsx';
import { UserFilter } from '../cmps/UserFilter.jsx';

class _BitcoinIndex extends Component {
  componentDidMount() {
    this.props.loadContacts();
  }

  onChangeFilter = (filterBy) => {
    this.props.setFilterBy(filterBy);
    this.props.loadContacts();
  };

  render() {
    const { contacts, filterBy } = this.props;
    console.log("contacts:",contacts)
    return (
      <section className='main-layout'>
        {contacts && (
          <main>
            <UserFilter
              onChangeFilter={this.onChangeFilter}
              filterBy={filterBy}
            />
            <ContactList contacts={contacts} />
            <button className='add-contact'>
              <Link to='contact/edit'>+</Link>
            </button>
          </main>
        )}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  contacts: state.contactModule.contacts,
  filterBy: state.contactModule.filterBy,
});

const mapDispatchToProps = {
  loadContacts,
  setFilterBy,
};

export const BitcoinIndex = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BitcoinIndex);