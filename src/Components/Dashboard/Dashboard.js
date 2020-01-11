import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import Groups from '../Groups/Groups';

export default () => {
    const [member, setMember] = useState({});

    useEffect(() => {
        axios.get('/api/member')
        .then((res) => {
            setMember(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <Header member={member}/>
            <Groups member={member}/>
        </div>
    )
}