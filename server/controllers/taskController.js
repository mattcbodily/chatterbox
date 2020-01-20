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
    },
    addColumn: (req, res) => {
        const {id, order, name} = req.body,
              db = req.app.get('db');

        db.taskboard.add_column({id, order, name})
        .then(columns => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
    },
    addTask: (req, res) => {
        const {id, order, task, priority} = req.body,
              db = req.app.get('db');

        db.taskboard.add_task({id, order, task, priority})
        .then(tasks => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
    }
}