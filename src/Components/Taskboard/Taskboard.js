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
            columns: [],
            columnName: '',
            toggleAddView: false
        }
    }
    
    componentDidMount(){
        this.getColumns()
    }

    componentDidUpdate(prevProps){
        if(prevProps.selectedGroup !== this.props.selectedGroup){
            this.getColumns();
        }
    }
    
    getColumns = () => {
        axios.get(`/api/columns/${this.props.selectedGroup}`)
        .then(res => this.setState({columns: res.data}))
        .catch(err => console.log(err));
    }

    addColumn = () => {
        const column = {
            id: this.props.selectedGroup,
            order: this.state.columns[this.state.columns.length - 1].column_order + 1,
            name: this.state.columnName
        }

        axios.post('/api/column', column)
        .then(res => this.getColumns())
        .catch(err => console.log(err))

        this.handleAddView()
    }

    onDragEnd = result => {
        console.log('hit', result)
    }

    handleAddView = () => {
        this.setState({
            toggleAddView: !this.state.toggleAddView
        })
    }

    handleInput = (val) => {
        this.setState({columnName: val})
    }

    render(){
        return (
            <div className='taskboard'>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div className='column-flex'>
                        <section className='add-column-container'>
                            {this.state.toggleAddView
                            ? (<>
                                <input value={this.state.columnName} onChange={(e) => this.handleInput(e.target.value)}/>
                                <button onClick={this.addColumn}>Submit</button>
                                <button onClick={this.handleAddView}>Cancel</button>
                               </>)
                            : (<>
                                <button className='add-column-button' onClick={this.handleAddView}>+</button>
                                <p>Add Column</p>
                               </>)}
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