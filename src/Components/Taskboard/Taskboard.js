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
            <div className='taskboard'>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div className='column-flex'>
                        <section className='add-column-container'>
                            <div className='add-column-button'>+</div>
                            <p>Add Column</p>
                        </section>
                        {this.state.columns.map(columnData => <Columns key={columnData.column_id} column={columnData}/>)}
                    </div>
                </DragDropContext>
            </div>
        )   
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Taskboard);