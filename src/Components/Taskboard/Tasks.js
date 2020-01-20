import React, {Component} from 'react';
import {Draggable} from 'react-beautiful-dnd';

class Tasks extends Component {
    render(){
        return (
            <Draggable draggableId={`Task-${this.props.task.task_id}`} index={this.props.index}>
                {provided => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        {this.props.task.task}
                    </div>
                )}
            </Draggable>
        )
    }
}

export default Tasks;