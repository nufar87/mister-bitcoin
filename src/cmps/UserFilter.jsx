import React, { Component } from 'react';

export class UserFilter extends Component {
  state = {
    filterBy: null,
  };

  componentDidMount() {
    const { filterBy } = this.props;
    this.setState({ filterBy: { ...filterBy } });
  }

  handleRef = (elInput) => {
    elInput?.focus();
  };

  handleChange = ({ target }) => {
    const field = target.name;
    let value = target.value;
    switch (target.type) {
      case 'number':
      case 'range':
      case 'phone':
        value = +value;
        break;
      case 'checkbox':
      case 'radio':
        value = target.checked;
        break;
      default:
        break;
    }

    this.setState(
      (prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }),
      () => this.props.onChangeFilter({ ...this.state.filterBy })
    );
  };

  render() {
    const { filterBy } = this.state;
    if (!filterBy) return <div>Loading...</div>;
    const { term } = filterBy;

    return (
      <form className='contact-filter'>
        <label className='flex'>
          <input
            type='text'
            name='term'
            value={term}
            placeholder='search'
            onChange={this.handleChange}
            autoFocus
          />
        </label>
      </form>
    );
  }
}