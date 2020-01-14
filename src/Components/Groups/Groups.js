import React, {Component} from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import Message from '../Message/Message';
import './Groups.css';

class Groups extends Component {
    constructor(props){
        super(props);
        this.state = {
            groups: [],
            selectedGroup: {},
            createGroupView: false,
            groupName: '',
            groupDescription: '',
            privateGroup: false
        }
    }

    componentDidMount(){
        this.getGroups(this.props.member.member_id);
    }

    getGroups = (id) => {
        axios.get(`/api/groups/${id}`)
        .then(res => setGroups(res.data))
        .catch(err => console.log(err))
    }

    createGroup = () => {
        let newGroup = {
            id: props.member.member_id,
            groupName,
            groupDescription,
            privateGroup
        };

        axios.post('/api/group', newGroup)
        .then(res => {
            this.props.getGroupsFn(this.props.member.member_id);
            // setCreateGroupView(false);
        })
        .catch(err => console.log(err));
    }

    handleInputs = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        mappedGroups = this.state.groups.map((group, i) => {
            return (
                // need to set selected group here
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
                        value={this.state.groupName}
                        name='groupName'
                        maxLength='20'
                        onChange={(e) => this.handleInputs(e)}/>
                    <textarea 
                        value={this.state.groupDescription}
                        name='groupDescription'
                        maxLength='500'
                        onChange={(e) => this.handleInputs(e)}/>
                    <input 
                        type='checkbox'
                        value={this.state.privateGroup}
                        name='privateGroup'
                        onChange={(e) => this.handleInputs(e)}/>
                    <button onClick={this.createGroup}>Create</button>
                    {/* need to toggle createGroupView here */}
                    <button>Cancel</button>
                </>)}
                <Message member={this.props.member} selectedGroup={this.state.selectedGroup}/>
            </div>
        )
    }
};