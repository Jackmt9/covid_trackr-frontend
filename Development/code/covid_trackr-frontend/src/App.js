import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import LoginOrSignUp from './components/LoginOrSignUp.jsx'
import NavBar from './components/NavBar'
import {Route, Switch, Link, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

function App(globalState) {
  console.log(globalState)
  return (
    <div className="App">

      <div className='Header'>
        <NavBar/>
      </div>
      <main>
        <Switch>
          <Route path='/' exact component={LoginOrSignUp}/>
          <Route path='/login' component={Login}/>
        </Switch>
      </main>

    </div>
  );
}

export default App;


// let mapStateToProps = (globalState) => {
//   console.log(globalState)
//   return {
//     globalStateUser: globalState.user
//   }
// }

// let functionThatAddsProps = connect(mapStateToProps)
// let componentThatNowHasProps = functionThatAddsProps(App)
// export default componentThatNowHasProps;


