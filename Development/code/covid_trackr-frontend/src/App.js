import React from 'react';
import './App.css';
import Login from './components/Login'
import Search from './components/Search'
import WorldView from './components/WorldView'
import BookmarkTab from './components/BookmarkTab'
import CreateAccount from './components/CreateAccount'
import AccountTab from './components/AccountTab'
import LoginOrSignUp from './components/LoginOrSignUp.jsx'
import NavBar from './components/NavBar'
import {Route, Switch} from 'react-router-dom'
// import {connect} from 'react-redux'


function App(globalState) {
  console.log(globalState)
  return (
    <div className="App">
      <div className='Header'>
        <h1>COVID</h1>
        <img className="logo" src="https://static01.nyt.com/images/2015/07/20/science/20earth_dscovr/20earth_dscovr-jumbo.png" alt='earth from space'></img>
        <h1>TRACKr</h1>
      </div>
      {localStorage.token? 
        <NavBar/>
      :
        ''
    }
        
      <main>
        <Switch>
          <Route path='/' exact component={LoginOrSignUp}/>
          <Route path='/login' component={Login}/>
          <Route path='/account' component={AccountTab}/>
          <Route path='/search' component={Search}/>
          <Route path='/world' component={WorldView}/>
          <Route path='/bookmarks' component={BookmarkTab}/>
          <Route path='/create_account' component={CreateAccount}/>
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


