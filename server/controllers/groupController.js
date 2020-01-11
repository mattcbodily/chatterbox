module.exports = {
    getGroups: (req, res) => {
        const {id} = req.params,
              db = req.app.get('db');

        db.group.get_member_groups({id})
        .then(groups => res.status(200).send(groups))
        .catch(err => res.status(500).send(err))
    },
    createGroup: (req, res) => {
        const {id, groupName, groupDescription, privateGroup} = req.body,
              db = req.app.get('db');

        db.group.create_group({groupName, groupDescription, privateGroup})
        .then(group => {
            db.group.add_group_members({id, groupId: group[0].group_id})
            res.sendStatus(201)
        })
        .catch(err => res.status(500).send(err))
    }
}