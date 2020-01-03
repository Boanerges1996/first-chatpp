import React from 'react';
import './App.css';
import socketIOClient from 'socket.io-client'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Signup from './components/signup/signup';
import Login from './components/login/login';
import Page from './components/chat-platform/wholepage';



class App extends React.Component{
  
  render(){
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Login}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/user" component={Page}/>
        </div>
      </Router>
      
    );
  }
  
}

export default App;
