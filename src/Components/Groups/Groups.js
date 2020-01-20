import React, {Component} from 'react';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import {getGroups, setSelectedGroup} from '../../redux/memberReducer';
import axios from 'axios';
import Header from '../Header/Header';
import GroupOptions from '../GroupOptions/GroupOptions';
import Message from '../Message/Message';
import Taskboard from '../Taskboard/Taskboard';
import './Groups.scss';

class Groups extends Component {
    constructor(props){
        super(props);
        this.state = {
            messages: [],
            createGroupView: false,
            groupName: '',
            groupDescription: '',
            privateGroup: false,
            chatJoined: false,
            taskboardView: false
        }
    }

    componentDidMount(){
        this.getGroups(this.props.member.member_id);
        this.socket = io('http://localhost:3333');
        this.socket.on('room joined', data => {
            this.joinSuccess(data)
          })
        this.socket.on('message dispatched', data => {
            this.updateMessages(data);
        })
    }

    componentWillUnmount(){
        this.socket.disconnect()
    }

    getGroups = (id) => {
        axios.get(`/api/groups/${id}`)
        .then(res => this.props.getGroups(res.data))
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
        await this.props.setSelectedGroup(id)
        this.socket.emit('join room', {
            group: this.props.selectedGroup
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

    toggleTaskboardView = () => {
        this.setState({
            taskboardView: !this.state.taskboardView
        })
    }

    handleInputs = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        const mappedGroups = this.props.groups.map((group, i) => {
            return (
                <section key={i} onClick={() => this.joinRoom(group.group_id)} className='group-selection'>
                    <p>{group.group_name}</p>
                </section>
            )
        })
        return (
            <div className='groups'>
                <Header />
                {!this.state.createGroupView
                ? (<>
                    <section onClick={this.toggleCreateView} className='group-selection'>+ Create Group</section>
                    {mappedGroups}
                </>)
                : (<section className='group-creation'>
                    <input
                        className='group-creation-input'
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
                    <button onClick={this.createGroup} className='group-button'>Create</button>
                    <button onClick={this.toggleCreateView} className='group-button'>Cancel</button>
                </section>)}
                <GroupOptions groups={this.props.groups} selectedGroup={this.props.selectedGroup} toggleFn={this.toggleTaskboardView} taskboardView={this.state.taskboardView}/>
                {!this.state.taskboardView
                ? <Message 
                    messages={this.state.messages}
                    sendMessageFn={this.sendMessage}/>
                : <Taskboard />}
            </div>
        )
    }
};

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {getGroups, setSelectedGroup})(Groups);