import React from 'react';
import './GroupOptions.scss';

export default (props) => {
    const {groups, selectedGroup} = props;
    const groupInfo = groups.find(group => group.group_id === selectedGroup);
    return (
        <div className='group-options'>
            {groupInfo 
            ?(<section>
                <span className='group-options-name'>{groupInfo.group_name}</span> 
                <button className='group-options-button' onClick={props.toggleFn}>Task Board</button>
              </section>) 
            : null}
        </div>
)};