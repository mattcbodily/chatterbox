import React, {Component} from 'react';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import axios from 'axios';
import Header from '../Header/Header';
import Message from '../Message/Message';
import './Groups.scss';

class Groups extends Component {
    constructor(props){
        super(props);
        this.state = {
            groups: [],
            selectedGroup: {},
            messages: [],
            createGroupView: false,
            groupName: '',
            groupDescription: '',
            privateGroup: false,
            chatJoined: false
        }
    }

    componentDidMount(){
        this.getGroups(this.props.member.member_id);
        this.socket = io('http://localhost:3333');
        this.socket.on('room joined', data => {
            this.joinSuccess(data)
          })
        this.socket.on('message dispatched', data => {
            console.log('hit', data)
            this.updateMessages(data);
        })
    }

    componentWillUnmount(){
        this.socket.disconnect()
    }

    getGroups = (id) => {
        axios.get(`/api/groups/${id}`)
        .then(res => this.setState({groups: res.data}))
        .catch(err => console.log(err))
    }

    createGroup = () => {
        const {groupName, groupDescription, privateGroup} = this.state;
        let newGroup = {
            id: this.props.member.member_id,
            groupName,
            groupDescription,
            privateGroup
        };

        axios.post('/api/group', newGroup)
        .then(res => {
            this.props.getGroupsFn(this.props.member.member_id);
            this.toggleCreateView()
        })
        .catch(err => console.log(err));
    }

    joinRoom = async(id) => {
        await this.setState({
            selectedGroup: id
        })
        this.socket.emit('join room', {
            group: this.state.selectedGroup
        })
    }

    joinSuccess(messages) {
        this.setState({
          chatJoined: true,
          messages
        })
    }

    sendMessage = (message) => {
        this.socket.emit('message sent', {
          message,
          sender: this.props.member.member_id,
          group: this.state.selectedGroup
        })
    }

    updateMessages(messages) {
        this.setState({
          messages
        })
    }

    toggleCreateView = () => {
        this.setState({
            createGroupView: !this.state.createGroupView
        })
    }

    handleInputs = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        console.log(this.state.messages)
        const mappedGroups = this.state.groups.map((group, i) => {
            return (
                <p key={i} onClick={() => this.joinRoom(group.group_id)}>{group.group_name}</p>
            )
        })
        return (
            <div className='groups'>
                <Header />
                {!this.state.createGroupView
                ? (<>
                    <button onClick={this.toggleCreateView}>Create Group</button>
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
                    <button onClick={this.toggleCreateView}>Cancel</button>
                </>)}
                <Message 
                    member={this.props.member} 
                    selectedGroup={this.state.selectedGroup}
                    messages={this.state.messages}
                    sendMessageFn={this.sendMessage}/>
            </div>
        )
    }
};

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapStateToProps)(Groups);