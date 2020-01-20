import React, {Component} from 'react';
import {connect} from 'react-redux';
import {DragDropContext} from 'react-beautiful-dnd';
import axios from 'axios';
import Columns from './Columns';
import './Taskboard.scss';

class Taskboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            columns: []
        }
    }
    
    componentDidMount(){
        axios.get(`/api/columns/${this.props.selectedGroup}`)
        .then(res => this.setState({columns: res.data}))
        .catch(err => console.log(err));
    }

    onDragEnd = result => {
        console.log('hit', result)
    }

    render(){
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                {this.state.columns.map(columnData => <Columns key={columnData.column_id} column={columnData}/>)}
            </DragDropContext>
        )   
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Taskboard);