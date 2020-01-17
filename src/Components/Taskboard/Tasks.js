import React from 'react';
import {Draggable} from 'react-beautiful-dnd';

const Tasks = (props) => {
    return (
        <Draggable draggableId={this.props.task.task_id}>
            {provided => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    innerRef={provided.innerRef}
                >
                    task content goes here
                </div>
            )}
        </Draggable>
    )
}

export default Tasks;