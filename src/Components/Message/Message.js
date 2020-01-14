import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import './Message.css';
const socket = io('http://localhost:3333')

export default (props) => {
    const [messages, setMessages] = useState([]);
    const [joined, setJoined] = useState(false);
    const [messageText, setMessageText] = useState('');

    useEffect(() => {
        if(typeof props.selectedGroup === 'number'){
            socket.emit('join room', {group: props.selectedGroup})
        }
        socket.on('room joined', data => {
            setJoined(true)
            setMessages(data)
        });
        socket.on('message dispatched', data => {
            console.log('hit', data)
            setMessages(data)
        })
    }, [props, socket])

    const sendMessage = () => {
        socket.emit('message sent', {
            group: props.selectedGroup,
            sender: props.member.member_id,
            message: messageText
        })
        setMessageText('');
    }

    const mappedMessages = messages.map((message, i) => {
        return (
            <p key={i}>{message.message}</p>
        )
    })
    return (
        <div className='message'>
            {mappedMessages}
            <input className='message-input' onChange={(e) => setMessageText(e.target.value)}/>
            <button className='send-message-button' onClick={sendMessage}>Send</button>
        </div>
    )
}