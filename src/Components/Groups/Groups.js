import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Message from '../Message/Message';
import './Groups.css';

export default (props) => {
    const [groups, setGroups] = useState([]);
    const [createGroupView, setCreateGroupView] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [privateGroup, setPrivateGroup] = useState(false);

    useEffect(() => {
        if(props.member.member_id){
            getGroups(props.member.member_id)
        }
    }, [props.member.member_id])

    const getGroups = (id) => {
        axios.get(`/api/groups/${id}`)
        .then(res => setGroups(res.data))
        .catch(err => console.log(err))
    }

    const createGroup = () => {
        let newGroup = {
            id: props.member.member_id,
            groupName,
            groupDescription,
            privateGroup
        };

        axios.post('/api/group', newGroup)
        .then(res => {
            props.getGroupsFn(props.member.member_id);
            setCreateGroupView(false);
        })
        .catch(err => console.log(err));
    }

    const mappedGroups = groups.map((group, i) => {
        return (
            <p key={i}>{group.group_name}</p>
        )
    })
    return (
        <div className='groups'>
            {!createGroupView
            ? (<>
                <button onClick={() => setCreateGroupView(true)}>Create Group</button>
                {mappedGroups}
               </>)
            : (<>
                <input
                    value={groupName}
                    maxLength='20'
                    onChange={(e) => setGroupName(e.target.value)}/>
                <textarea 
                    value={groupDescription}
                    maxLength='500'
                    onChange={(e) => setGroupDescription(e.target.value)}/>
                <input 
                    type='checkbox'
                    value={privateGroup}
                    onChange={(e) => setPrivateGroup(e.target.value)}/>
                <button onClick={createGroup}>Create</button>
                <button onClick={() => setCreateGroupView(false)}>Cancel</button>
               </>)}
            <Message />
        </div>
    )
};