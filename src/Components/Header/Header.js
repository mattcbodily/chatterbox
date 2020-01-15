import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import './Header.scss';

const Header = (props) => {
    const logout = () => {
        axios.post('/api/logout').then(res => {
            props.history.push('/')
        })
    }

    return (
        <header className='header'>
                <img src={props.member.avatar} alt='member avatar' className='avatar-image'/>
                <span>{props.member.username}</span>
                <button onClick={logout}>Logout</button>
        </header>
    )
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default withRouter(connect(mapStateToProps)(Header));