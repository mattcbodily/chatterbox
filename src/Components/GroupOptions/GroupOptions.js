import React from 'react';
import './GroupOptions.scss';
//This component will display the group name, as well as give options to open the groups taskboard, if the group is private, and view the members in the group.

export default (props) => {
    const {groups, selectedGroup} = props;
    const groupInfo = groups.find(group => group.group_id === selectedGroup);
    return (
        <div className='group-options'>
            {groupInfo ? <span>{groupInfo.group_name}</span> : null}
        </div>
)};