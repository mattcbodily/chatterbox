import React, {Component} from 'react';
import {Droppable} from 'react-beautiful-dnd';
import axios from 'axios';
import Tasks from './Tasks';
import './Taskboard.scss'

class Columns extends Component {
    constructor(props){
        super(props);
        this.state = {
            tasks: [],
            taskInput: '',
            addTaskView: false,
            taskPriority: 'Low'
        }
    }
    
    componentDidMount(){
        this.getTasks()
    }
    
    getTasks = () => {
        axios.get(`/api/tasks/${this.props.column.column_id}`)
        .then(res => this.setState({tasks: res.data}))
        .catch(err => console.log(err))
    }

    addTask = () => {
        const task = {
            id: this.props.column.column_id,
            order: this.state.tasks.length ? this.state.tasks[this.state.tasks.length - 1].task_order + 1 : 1,
            task: this.state.taskInput,
            priority: this.state.taskPriority
        }

        axios.post('/api/task', task)
        .then(res => {
            this.getTasks()
            this.toggleAddView()
        })
        .catch(err => console.log(err));
    }

    toggleAddView = () => {
        this.setState({addTaskView: !this.state.addTaskView})
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render(){
        return (
            <Droppable droppableId={`Column-${this.props.column.column_id}`}>
                {provided => (
                    <div
                        ref={provided.innerRef} 
                        {...provided.droppableProps}
                        className='task-columns'
                    >
                        <p id='column-name'>{this.props.column.column_name}</p>
                        {this.state.addTaskView
                        ? (<>
                            <input value={this.state.taskInput} name='taskInput' onChange={(e) => this.handleInput(e)}/>
                            <label>Priority</label>
                            <select value={this.state.taskPriority} name='taskPriority' onChange={(e) => this.handleInput(e)}>
                                <option value='High'>High</option>
                                <option value='Moderate'>Moderate</option>
                                <option value='Low'>Low</option>
                            </select>
                            <button onClick={this.addTask}>Add</button>
                            <button onClick={this.toggleAddView}>Cancel</button>
                           </>)
                        : (<>
                            <section onClick={this.toggleAddView}>+ Add Task</section>
                           </>)}
                        {this.state.tasks.map((taskData, i) => <Tasks key={taskData.task_id} task={taskData} index={i}/> )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        )
    }
}

export default Columns;