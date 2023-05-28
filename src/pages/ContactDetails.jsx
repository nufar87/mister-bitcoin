import { Component } from 'react';
import { contactService } from '../services/contact.service';
import { Link } from 'react-router-dom';
import { TransferFund } from '../cmps/TransferFund.jsx';
import { MovesList } from '../cmps/MovesList';

import { loadUser } from '../store/actions/user.actions';
import { loadContacts, getNeighbors } from '../store/actions/contacts.actions';
import { connect } from 'react-redux';

class _ContactDetails extends Component {
  state = {
    next: null,
    prev: null,
  };
  componentDidMount() {
    this.loadContact();
  }

  goBack = () => {
    console.log('back');
    console.log(this.props);
    // this.props.history.push('/');
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.loadContact();
    }
  }

  loadContact = async () => {
    const neighbors = await this.props.getNeighbors(this.props.match.params.id);

    this.setState({
      next: neighbors.next,
      prev: neighbors.prev,
    });
  };

  render() {
    const { next, prev } = this.state;
    const contact = this.props.contact;
    if (!contact) return <div>loading...</div>;

    return (
      <>
        <section>
          <section className='contact-details'>
            <Link
              to={`/contact/${prev?._id}`}
              className='next-button'
              title='prev'
            ></Link>{' '}
            <img src={`https://i.pravatar.cc/150?img=${contact._id}`} alt="" />
            <div className='contact-info'>
              <p>
                Name: <span>{contact.name}</span>
              </p>
              <p>
                Phone: <span>{contact.phone}</span>
              </p>
              <p>
                Email: <span>{contact.email}</span>
              </p>
              <Link to='/contact' className='back-button'>
                Back
              </Link>
            </div>
            <Link
              to={`/contact/${next?._id}`}
              className='next-button'
              title='next'
            ></Link>
          </section>
          <TransferFund contact={contact} goBack={this.goBack} />
          <MovesList moves={contact.info.moves} update={this.getNeighbors} />
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userModule.loggedInUser,
  contact: state.contactModule.contact,
});

const mapDispatchToProps = {
  loadUser,
  loadContacts,
  getNeighbors,
};

export const ContactDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ContactDetails);
