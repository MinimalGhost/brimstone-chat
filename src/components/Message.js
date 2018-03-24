import React from 'react'
import Moment from 'react-moment'

const Message = (props) => {
  return (
    <li className="user-message">
      <img src={props.photo} />
      <div> 
        <h4>{props.username}</h4>
        <Moment fromNow className="moment">{props.date}</Moment>
      </div>
      <p>{props.text}</p>
    </li>
  )
}

export default Message
