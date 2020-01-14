import React from 'react';
import {connect} from 'react-redux';
import './Header.css';

const Header = (props) => {
    console.log(props)
    return (
        <header className='header'>
                <img src={props.member.avatar} alt='member avatar' className='avatar-image'/>
                <span>Welcome, {props.member.username}</span>
        </header>
    )
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapStateToProps)(Header);