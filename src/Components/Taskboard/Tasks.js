import React from 'react';
import {Draggable} from 'react-beautiful-dnd';

const Tasks = (props) => {
    return (
        <Draggable draggableId={toString(props.task.task_id)} index={props.index}>
            {provided => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {props.task.task}
                </div>
            )}
        </Draggable>
    )
}

export default Tasks;