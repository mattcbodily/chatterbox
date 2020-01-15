import React, {useState} from 'react';
import './Message.scss';

export default (props) => {
    const [messageText, setMessageText] = useState('');

    const sendMessage = () => {
        props.sendMessageFn(messageText);
        setMessageText('');
    }

    console.log(props.messages)

    const mappedMessages = props.messages.map((message, i) =>
        <section key={i} className='message-info-container'>
            <img 
                src={message.avatar} 
                alt={message.username}
                className='sender-avatar'/>
            <section>
                <p className='message-username'>{message.username}</p>
                <p className='message-text'>{message.message}</p>
            </section>
        </section>
    )
    return (
        <div className='message'>
            {mappedMessages}
            <input value={messageText} className='message-input' onChange={(e) => setMessageText(e.target.value)}/>
            <button className='send-message-button' onClick={sendMessage}>Send</button>
        </div>
    )
}