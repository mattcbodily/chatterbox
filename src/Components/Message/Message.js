import React, {useState} from 'react';
import './Message.css';

export default (props) => {
    const [messageText, setMessageText] = useState('');

    const sendMessage = () => {
        props.sendMessageFn(messageText);
        setMessageText('');
    }

    const mappedMessages = props.messages.map((message, i) => 
        <p key={i}>{message.message}</p>
    )
    return (
        <div className='message'>
            {mappedMessages}
            <input value={messageText} className='message-input' onChange={(e) => setMessageText(e.target.value)}/>
            <button className='send-message-button' onClick={sendMessage}>Send</button>
        </div>
    )
}