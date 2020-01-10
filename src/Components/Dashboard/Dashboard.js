import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import Groups from '../Groups/Groups';
import Message from '../Message/Message';

export default () => {
    const [member, setMember] = useState({});
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        axios.get('/api/member')
        .then(res => setMember(res.data))
        .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <Header />
            <Groups />
            <Message />
        </div>
    )
}