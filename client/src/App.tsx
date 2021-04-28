import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Chat from './components/chat/Chat';
import Login from './components/login/Login';

const App: React.FC = () => (
  <Router>
    <Route path="/" exact component={Login} />
    <Route path="/chat" component={Chat} />
  </Router>
);

export default App;
