
import { NavLink, withRouter } from 'react-router-dom';

function _AppHeader({ selectPage }) {
  return (
    <section className='main-header main-layout full'>
      <header className='flex space-between'>
        <div className='logo'>
          {/* <a>MrBitcoin</a> */}
          <NavLink exact to='/'>
          MrBitcoin
          </NavLink>
        </div>
        <nav className='main-nav flex'>
          <NavLink exact to='/'>
            Home
          </NavLink>
          <NavLink exact to='/contact'>
            Contacts
          </NavLink>
          <NavLink exact to='/statistics'>
            Statistics
          </NavLink>
        </nav>
      </header>
    </section>
  );
}

export const AppHeader = withRouter(_AppHeader);