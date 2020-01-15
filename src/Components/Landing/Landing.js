import React, {useState} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {getMember} from '../../redux/memberReducer';
import logo from '../../assets/chatterbox_logo.svg';
import './Landing.scss';

const Landing = (props) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verPassword, setVerPassword] = useState('');
    const [admin, setAdmin] = useState(false);
    const [registerView, setRegisterView] = useState(false);

    const login = () => {
        axios.post('/api/login', {email, password}).then(res => {
            props.getMember(res.data)
            props.history.push('/dashboard')
        }).catch(err => console.log(err));
    }

    const register = () => {
        if(password === verPassword){
            axios.post('/api/register', {username, email, password, admin}).then(res => {
                props.getMember(res.data)
                props.history.push('/dashboard')
            }).catch(err => console.log(err));
        }
    }

    return(
        <div className='landing'>
            <section>
                <h1>Welcome to Chatterbox</h1>
                <h2>The ultimate tool for your business</h2> 
                {/* intro to chatterbox here, carousel different features? */}
                <img className='landing-logo' src={logo} alt='Chatterbox icon'/>
            </section>
            <div className='landing-divider'></div>
            <section className='auth-form'>
                {registerView
                ? <input 
                    value={username}
                    maxLength='20'
                    onChange={(e) => setUsername(e.target.value)}/>
                : null}
                <input 
                    value={email}
                    maxLength='150'
                    onChange={(e) => setEmail(e.target.value)}/>
                <input
                    type='password'
                    value={password}
                    maxLength='25'
                    onChange={(e) => setPassword(e.target.value)}/>
                {registerView
                ? (<>
                    <input
                        type='password' 
                        value={verPassword}
                        maxLength='25'
                        onChange={(e) => setVerPassword(e.target.value)}/>
                    <section>
                        <input
                            id='admin-check' 
                            type='checkbox' 
                            value={admin}
                            onChange={(e) => setAdmin(e.target.value)}/>
                        <span>I am an administrator</span>
                    </section>
                    <button onClick={register}>Register</button>
                    <p>Have an account? <span className='auth-link' onClick={() => setRegisterView(false)}>Login here.</span></p>
                   </>
                )
                : (<>
                    <button onClick={login}>Login</button>
                    <p>Don't have an account? <span className='auth-link' onClick={() => setRegisterView(true)}>Register here.</span></p>
                   </>)}
            </section>
        </div>
    )
}

export default connect(null, {getMember})(Landing);