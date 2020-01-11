import React from 'react';
import './Header.css';

export default (props) => {
    return (
        <header className='header'>
                <img src={props.member.avatar} alt='member avatar' className='avatar-image'/>
                <span>Welcome, {props.member.username}</span>
        </header>
    )
}