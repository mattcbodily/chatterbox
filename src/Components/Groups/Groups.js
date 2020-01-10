import React, {useState} from 'react';
import './Groups.css';

export default () => {
    const [groups, setGroups] = useState([]);
    const [createGroupView, setCreateGroupView] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [privateGroup, setPrivateGroup] = useState(false);

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
                <button>Create</button>
                <button onClick={() => setCreateGroupView(false)}>Cancel</button>
               </>)}
        </div>
    )
};