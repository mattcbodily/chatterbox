module.exports = {
    //This controller needs handler methods for getting group columns, getting column tasks, updating column/task order based on react-beautiful-dnd data, deleting columns/tasks, updating columns/tasks
    getColumns: (req, res) => {
        const {id} = req.params,
              db = req.app.get('db');
              
        db.taskboard.get_columns({id: +id})
        .then(columns => res.status(200).send(columns))
        .catch(err => res.status(500).send(err))
    },
    getTasks: (req, res) => {
        const {id} = req.params,
              db = req.app.get('db');
        
        db.taskboard.get_tasks({id})
        .then(tasks => res.status(200).send(tasks))
        .catch(err => res.status(500).send(err))
    }
}