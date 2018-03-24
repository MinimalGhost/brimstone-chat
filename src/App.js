import React, { Component } from 'react';
import { auth, provider } from './firebase'
import MessageList from './components/MessageList'
import './App.css';

class App extends Component {
  state = {
    user: null
  }
  
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    })
  }
  
  login = () => {
    // login button logic
    auth.signInWithPopup(provider)
      .then((res) => {
        const user = res.user;
        this.setState({
          user
        })
      })
  }

  logout = () => {
    // clear user from state on logout
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        })
      })
  }
  
  render() {
    return (
      <div className="App">
      <header>
        <i className="fa"><img src="brimstone.png" /></i><h4 className="header-brand">Brimstone Chat</h4>
        {this.state.user ?
          <button className="log-button" onClick={this.logout}>Log Out</button>
          :
          <button className="log-button" onClick={this.login}>Log In</button>
        }
      </header>
        <MessageList user={this.state.user} />
      </div>
    );
  }
}

export default App;
