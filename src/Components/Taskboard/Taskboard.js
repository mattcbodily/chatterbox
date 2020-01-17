import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {DragDropContext} from 'react-beautiful-dnd';
import axios from 'axios';
import Columns from './Columns';
import './Taskboard.scss';

const Taskboard = (props) => {
    const [columns, setColumns] = useState([])
    
    useEffect(() => {
        axios.get(`/api/columns/${props.selectedGroup}`)
        .then(res => setColumns(res.data))
        .catch(err => console.log(err));
    }, [])

    console.log(columns)
    const onDragEnd = result => {
        //axios request to update the order of the table
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {columns.map(columnData => <Columns key={columnData.column_id} column={columnData} />)}
        </DragDropContext>
    )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Taskboard);