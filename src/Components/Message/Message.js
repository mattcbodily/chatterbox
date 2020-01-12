import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import './Message.css';

export default (props) => {
    const [messages, setMessages] = useState([]);
    const [socket] = useState(io());

    useEffect(() => {
        if(typeof props.selectedGroup === 'number'){
            socket.emit('join room', {group: props.selectedGroup})
        }
        socket.on('room joined', data => setMessages(data));
    }, [props, socket])


    return (
        <div className='message'>
            Message Component
        </div>
    )
}