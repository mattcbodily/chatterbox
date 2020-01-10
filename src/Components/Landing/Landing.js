import React, {useState} from 'react';
import axios from 'axios';
import './Landing.css';

export default (props) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verPassword, setVerPassword] = useState('');
    const [admin, setAdmin] = useState(false);
    const [registerView, setRegisterView] = useState(false);

    const login = () => {
        axios.post('/api/login', {email, password}).then(res => {
            props.history.push('/dashboard')
        }).catch(err => console.log(err));
    }

    const register = () => {
        if(password === verPassword){
            axios.post('/api/register', {username, email, password, admin}).then(res => {
                props.history.push('/dashboard')
            }).catch(err => console.log(err));
        }
    }

    return(
        <div className='landing'>
            <section>
                {/* intro to chatterbox here, carousel different features? */}
                <img width='350px' src='https://cdna.artstation.com/p/assets/images/images/009/583/862/large/esther-gaona-0208-a-i-gaonavmonzerrat-calamardoguapo-v1.jpg?1519791896' alt='filler'/>
            </section>
            <div className='landing-divider'></div>
            <section className='auth-form'>
                <input 
                    value={username}
                    maxLength='20'
                    onChange={(e) => setUsername(e.target.value)}/>
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
                    <input 
                        type='checkbox' 
                        value={admin}
                        onChange={(e) => setAdmin(e.target.value)}/>
                    <button onClick={register}>Register</button>
                    <p>Have an account? <span onClick={() => setRegisterView(false)}>Login here.</span></p>
                   </>
                )
                : (<>
                    <button onClick={login}>Login</button>
                    <p>Don't have an account? <span onClick={() => setRegisterView(true)}>Register here.</span></p>
                   </>)}
            </section>
        </div>
    )
}