import React, {useState, useEffect} from 'react';
import {Droppable} from 'react-beautiful-dnd';
import axios from 'axios';
import Tasks from './Tasks';

const Column = (props) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if(props.column.column_id){
            axios.get(`/api/tasks/${props.column.column_id}`)
            .then(res => setTasks(res.data))
            .catch(err => console.log(err))
        }
    }, [props.column])

    console.log(tasks)

    return (
        <div>
            <Droppable droppableId={toString(props.column.column_id)}>
                {provided => (
                    <div
                        ref={provided.innerRef} 
                        {...provided.droppableProps}
                    >
                        {props.column.column_name}
                        {tasks.map((taskData, i) => <Tasks key={taskData.task_id} task={taskData} index={i}/> )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default Column;