import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import {Route, Switch, Link, NavLink} from 'react-router-dom'

function App() {
  return (
    <div className="App">

      <main>

        <Switch>
          {/* <Route path='/' exact component={Home}/> */}
          <Route path='/login' component={Login}/>
        </Switch>
      </main>
      <header className="App-header">

      </header>

    </div>
  );
}

export default App;
