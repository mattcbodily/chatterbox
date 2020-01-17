import React, {Component} from 'react';
import {Droppable} from 'react-beautiful-dnd';
import axios from 'axios';
import Tasks from './Tasks';
import './Taskboard.scss'

class Columns extends Component {
    constructor(props){
        super(props);
        this.state = {
            tasks: []
        }
    }
    
    componentDidMount(){
            axios.get(`/api/tasks/${this.props.column.column_id}`)
            .then(res => this.setState({tasks: res.data}))
            .catch(err => console.log(err))
    }

    render(){
        return (
            <div>
                <Droppable droppableId={toString(this.props.column.column_id)}>
                    {provided => (
                        <div
                            ref={provided.innerRef} 
                            {...provided.droppableProps}
                            className='task-columns'
                        >
                            {this.props.column.column_name}
                            {this.state.tasks.map((taskData, i) => <Tasks key={taskData.task_id} task={taskData} index={i}/> )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        )
    }
}

export default Columns;