import React, { Component } from 'react'
import * as ReactDOM from 'react-dom';
import firebase, { auth, provider } from '../firebase'
import Message from './Message'

class MessageList extends Component {
  state = {
    text: '',
    username: '',
    messages: []
  }

  componentWillMount() {
    // grab all previous messages from firebase
    const messagesRef = firebase.database().ref('messages');
    messagesRef.on('value', (snapshot) => {
      let messages = snapshot.val()
      let newState = []

      // add them to array for state integration
      for (let message in messages) {
        newState.push({
          id: message,
          user: messages[message].user,
          photo: messages[message].photo,
          text: messages[message].text,
          date: messages[message].date
        })
      }
      this.setState({
        messages: newState
      })
    })
  }
  
  componentDidUpdate() {
    /* arbitrary ternary checks for active user to 
     prevent bottom scroller bug when no user found */
    {this.props.user ? 
      // if there's a user, keep chat scrolled to the bottom
      this.scrollToBottom()
      :
      null
    }
  }

  handleChange = (e) => {
    // controlled field event handler
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    // get the current date for moment.js
    let date = Date()
    
    // create and add submitted message to firebase db
    const messagesRef = firebase.database().ref('messages');
    const message = {
      id: this.state.messages.length,
      user: this.props.user.displayname || this.props.user.email,
      photo: this.props.user.photoURL,
      text: this.state.text,
      date: date
    }
    messagesRef.push(message)
    
    // update state with latest message
    this.setState({
      messages: [...this.state.messages, message],
      text: ''
    })
  }
  
  scrollToBottom = () => {
    // get access to the <ul> element via the ref 
    const { messageList } = this.refs;
    
    /* then get the scroll height and the height of the 
    <ul> element to calculate the maximum scroll top */
    const scrollHeight = messageList.scrollHeight;
    const height = messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    
    // gets an element that is currently on the DOM
    ReactDOM.findDOMNode(messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  render() {
    // render out all messages from state
    const currentMessages = this.state.messages.map((message, i) => {
      return (
        <Message key={message.id} username={message.user} photo={message.photo} text={message.text} date={message.date}/>
      )
    })
    return (
      <div>
        {this.props.user ?
          <div className="wrapper">
            <ul ref="messageList" className="message-list">
              {currentMessages}    
            </ul>
            <form>
              <input name="text" value={this.state.text} onChange={this.handleChange} type="text" placeholder="Message" />
              <button onClick={this.handleSubmit}>Submit Message</button>
            </form>
          </div>
          :
          <div className="prompt">
            <p>Please log in</p>
            <img src="flicker.png" />
            <p>to use Brimstone chat</p>
          </div>
        }
      </div>
    )
  }
}

export default MessageList
