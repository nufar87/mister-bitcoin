import React, { Component } from 'react';
import { contactService } from '../services/contact.service';
import { connect } from 'react-redux';
import { saveContact } from '../store/actions/contacts.actions';
import { login } from '../store/actions/user.actions';

class _Login extends Component {
  state = {
    contact: null,
  };

  componentDidMount() {
    let contact = contactService.getEmpty();
    contact = {
      ...contact,
      info: {
        coins: 100,
        moves: [],
      },
    };

    this.setState({ contact });
  }

  handleChange = ({ target }) => {
    const field = target.name;
    let value = target.value;

    this.setState((prevState) => ({
      contact: { ...prevState.contact, [field]: value },
    }));
  };

  onSave = async (ev) => {
    ev.preventDefault();
    try {
      const user = await this.props.saveContact(this.state.contact);
      //   SET LOGGED IN
      await this.props.login(user);
      this.props.history.push('/');
    } catch (err) {
      console.log('err:', err);
    }
  };

  render() {
    const { contact } = this.state;
    return (
      <div className='login-form'>
        <h2>Please enter your name</h2>
        <form onSubmit={this.onSave}>
          <label>
            {contact && (
              <input
                type='text'
                name='name'
                value={contact?.name}
                onChange={this.handleChange}
                placeholder='name'
              />
            )}
          </label>

          <button>sign up</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  saveContact,
  login,
};

export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login);