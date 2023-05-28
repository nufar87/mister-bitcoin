import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { contactService } from '../services/contact.service';
import { connect } from 'react-redux';
import {
  removeContact,
  saveContact,
  setContact,
} from '../store/actions/contacts.actions';

class _ContactEdit extends Component {
  state = {
    contact: contactService.getEmpty(),
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    try {
      if (id) {
        const contact = await contactService.getById(id);
        this.setState({ contact });
      }
    } catch (err) {
      console.log('had a problemeo:', err);
    }
  }

  onSave = async (ev) => {
    ev.preventDefault();
    try {
      await this.props.saveContact(this.state.contact);
      this.props.history.push('/contact');
    } catch (err) {
      console.log('err:', err);
    }
  };

  onDelete = async () => {
    try {
      await this.props.removeContact(this.state.contact._id);
      this.props.history.push('/contact');
    } catch (err) {
      console.log('err:', err);
    }
  };

  handleChange = ({ target }) => {
    const field = target.name;
    let value = target.value;
    switch (target.type) {
      case 'number':
      case 'range':
        value = +value;
        break;
      case 'checkbox':
        value = target.checked;
        break;
      default:
        break;
    }

    this.setState((prevState) => ({
      contact: { ...prevState.contact, [field]: value },
    }));
  };

  render() {
    const { contact } = this.state;
    const { name, email, phone } = contact;
    // const name = 'lala';
    // const email = 'lala';
    // const phone = 'lala';
    return (
      <section className='contact-edit'>
        <h1>{contact?._id ? 'Edit' : 'Add'} Contact </h1>
        <form onSubmit={this.onSave} className='edit-form'>
          <label>
            <span>Name:</span>
            <input
              type='text'
              onChange={this.handleChange}
              value={name}
              name='name'
            />
          </label>
          <label>
            <span>Email:</span>
            <input
              type='email'
              onChange={this.handleChange}
              value={email}
              name='email'
            />
          </label>
          <label>
            <span>Phone:</span>
            <input
              type='phone'
              onChange={this.handleChange}
              value={phone}
              name='phone'
            />
          </label>
          <button>{contact?._id ? 'Save' : 'Add'}</button>
          <div className='delete' onClick={this.onDelete}>
            Remove
          </div>
          <Link to='/contact' className='form-back'></Link>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
  removeContact,
  saveContact,
  setContact,
};

export const ContactEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ContactEdit);