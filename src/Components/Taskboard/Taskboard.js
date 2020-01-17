import React, {useState, useEffect} from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import axios from 'axios';
import Columns from './Columns';
import './Taskboard.scss';

export default (props) => {
    const [columns, setColumns] = useState([])
    
    useEffect(() => {
    //axios.get(`/api/columns`) Make group_id available to taskboard
    }, [])

    const onDragEnd = result => {
        //axios request to update the order of the table
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {columns.map(columnData => <Columns key={columnData.column_id} column={columnData} />)}
        </DragDropContext>
    )
}