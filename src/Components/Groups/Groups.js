import React, {useState} from 'react';
import axios from 'axios';
import './Groups.css';

export default (props) => {
    const [createGroupView, setCreateGroupView] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [privateGroup, setPrivateGroup] = useState(false);

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

    return (
        <div className='groups'>
            {!createGroupView
            ? (<>
                <button onClick={() => setCreateGroupView(true)}>Create Group</button>
                {/* groups will go here */}
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
        </div>
    )
};