import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import './Header.scss';
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';
library.add(faAngleDown)

const Header = (props) => {
    const [showDropDown, setShowDropDown] = useState(false);

    const logout = () => {
        axios.post('/api/logout').then(res => {
            props.history.push('/')
        })
    }

    return (
        <header className='header'>
                <img src={props.member.avatar} alt='member avatar' className='avatar-image'/>
                <span onClick={() => setShowDropDown(!showDropDown)}>{props.member.username}<FontAwesomeIcon icon='angle-down' className='menu-icon'/></span>
                {showDropDown
                ? (<section className='dropdown'>
                    <p onClick={logout}>Logout</p>
                   </section>)
                : null}
        </header>
    )
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default withRouter(connect(mapStateToProps)(Header));