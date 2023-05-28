import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { login, loadUser } from '../store/actions/user.actions';
import { saveContact, getNeighbors } from '../store/actions/contacts.actions';
import { contactService } from '../services/contact.service';
class _TransferFund extends Component {
  state = {
    amount: '',
  };
  async componentDidMount() {
    const user = await this.props.loadUser();
    console.log('this.props:', this.props);
  }
  transfer = async (ev) => {
    ev.preventDefault();
    const amount = this.state.amount;
    const { coins, moves } = this.props.user.info;
    if (!amount || amount > coins) {
      console.log('ya poor');
      return;
    } else {
      const move = this.getMove(amount);
      const user = {
        ...this.props.user,
        info: { coins: coins - amount, moves: [move, ...moves] },
      };
      const contact = {
        ...this.props.contact,
        info: {
          coins: this.props.contact.info.coins + amount,
          moves: [move, ...this.props.contact.info.moves],
        },
      };

      await this.props.saveContact(contact);
      await this.props.saveContact(user);
      await this.props.login(user);
      await this.props.getNeighbors(contact._id);
      this.setState({ amount: '' });
      this.props.goBack();
    }
  };

  getMove(amount) {
    return {
      type: 'transfer',
      from: this.props.user.name,
      to: this.props.contact.name,
      amount,
      _id: contactService.makeId(10),
    };
  }

  handleChange = ({ target }) => {
    let value = +target.value;
    this.setState({ amount: value });
  };
  render() {
    const contact = this.props.contact;
    const { amount } = this.state;

    return (
      <div className='transfer-funds'>
        <h2>Transfer coins to {contact.name}:</h2>

        <form onSubmit={this.transfer}>
          <label>
            <span>Amount : </span>
            <input
              type='number'
              name='amount'
              value={amount}
              onChange={this.handleChange}
            />
          </label>
          <button>Transfer!</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userModule.loggedInUser,
});

const mapDispatchToProps = {
  login,
  loadUser,
  saveContact,
  getNeighbors,
};

export const TransferFund = connect(
  mapStateToProps,
  mapDispatchToProps
)(_TransferFund);