import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Lady from './Lady';
import Organizer from './Organizer';

const App = () => (
  <div>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/organizer' component={Organizer} />
      <Route path='/lady-dev' component={Lady} />
    </Switch>
  </div>
);

export default App;
