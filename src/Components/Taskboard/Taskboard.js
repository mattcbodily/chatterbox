import React, {useState} from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import axios from 'axios';
import Columns from './Columns';
import './Taskboard.scss';

export default (props) => {
    const [columns, setColumns] = useState([])
    //axios call for columns on the dashboard

    onDragEnd = result => {
        //axios request to update the order of the table
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {columns.map(columnData => <Column key={columnData.column_id} column={columnData} />)}
        </DragDropContext>
    )
}