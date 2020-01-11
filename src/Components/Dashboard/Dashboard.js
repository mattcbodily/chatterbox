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
        .then((res) => {
            setMember(res.data)
            getGroups(res.data.member_id)
        })
        .catch(err => console.log(err))
    }, [])

    const getGroups = (id) => {
        console.log(id)
        axios.get(`/api/groups/${id}`)
        .then(groups => setGroups(groups.data))
        .catch(err => console.log(err))
    }

    console.log(groups)

    return (
        <div>
            <Header member={member}/>
            <Groups member={member} getGroupsFn={getGroups} groups={groups}/>
            <Message />
        </div>
    )
}