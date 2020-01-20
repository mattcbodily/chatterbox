import React, {Component} from 'react';
import {Draggable} from 'react-beautiful-dnd';

class Tasks extends Component {
    render(){
        return (
            <Draggable draggableId={`Task-${this.props.task.task_id}`} index={this.props.index}>
                {provided => (
                    <div
                        className='task'
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <p>{this.props.task.task}</p>
                    </div>
                )}
            </Draggable>
        )
    }
}

export default Tasks;