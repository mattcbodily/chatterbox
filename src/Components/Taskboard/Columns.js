import React, {useState, useEffect} from 'react';
import {Droppable} from 'react-beautiful-dnd';
import axios from 'axios';
import Tasks from './Tasks';

const Column = (props) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if(props.column.column_id){
            //axios request for tasks by column
        }
    }, [props.column])

    return (
        <div>
            <Droppable droppableId={this.props.column.column_id}>
                {provided => (
                    <div
                        innerRef={provided.innerRef} 
                        {...provided.droppableProps}
                    >
                        {tasks.map((taskData, i) => <Task key={taskData.task_id} task={taskData} index={i}/> )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default Column;