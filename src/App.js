import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import './assets/styles/main.scss';
import { AppHeader } from './cmps/AppHeader.jsx';
import { AppFooter } from './cmps/AppFooter.jsx';
import { Home } from './pages/Home.jsx';
import { BitcoinIndex } from './pages/BitcoinIndex.jsx';
import { ContactDetails } from './pages/ContactDetails.jsx';
import { Statistics } from './pages/Statistics.jsx';
import { ContactEdit } from './pages/ContactEdit.jsx';
import { Login } from './pages/Login.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className='App main-layout'>
        <AppHeader />
        <div className='content main-layout'>
          <Switch>
            <Route path='/contact/edit/:id?' component={ContactEdit} />
            <Route path='/contact/:id' component={ContactDetails} />
            <Route path='/contact' component={BitcoinIndex} />
            <Route path='/statistics' component={Statistics} />
            <Route path='/login' component={Login} />
            <Route path='/' component={Home} />
          </Switch>
        </div>
        <AppFooter />
      </div>
    </Router>
  );
}

export default App;
