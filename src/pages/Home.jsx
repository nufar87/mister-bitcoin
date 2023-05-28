import React, { Component } from 'react';
import { UserPreview } from '../cmps/UserPreview';
import { MovesList } from '../cmps/MovesList';
import { bitcoinService } from '../services/bitcoin.service';
import { connect } from 'react-redux';
import { loadUser } from '../store/actions/user.actions';
import { loadContacts } from '../store/actions/contacts.actions';

class _Home extends Component {
  state = {
    rate: null,
  };

  async componentDidMount() {
    const user = await this.props.loadUser();
    await this.props.loadContacts();
    if (!user) this.props.history.push('/login');

    this.loadRate();
  }

  loadRate = async () => {
    try {
      const rate = await bitcoinService.getRate();
      this.setState({ rate });
    } catch (err) {
      console.log('err :', err);
    }
  };

  render() {
    const { rate } = this.state;
    const loggedInUser = { ...this.props.user };
    return (
      <div>
        {loggedInUser.name && rate && (
          <>
            <UserPreview user={loggedInUser} rate={rate} />
            <MovesList moves={loggedInUser.info.moves} />
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // robots: state.robotModule.robots,
  // filterBy: state.robotModule.filterBy,
  user: state.userModule.loggedInUser,
});

const mapDispatchToProps = {
  loadUser,
  loadContacts,
};

export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home);