const bcrypt = require('bcryptjs');

module.exports = {
    register: async(req, res) => {
        const {username, email, password, admin} = req.body;
        const db = req.app.get('db');

        let member = await db.auth.check_member({email});
        if(member[0]){
            return res.status(400).send('Email already in use')
        }
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        let newMember = await db.auth.register_member({username, email, password: hash, admin});
        req.session.member = newMember[0];
        res.status(201).send(req.session.user);
    },
    login: async(req, res) => {
        const {email, password} = req.body;
        const db = req.app.get('db');

        let member = await db.auth.check_member({email});
        if(!member[0]){
            return res.status(400).send('Email not found')
        }
        let authenticated = bcrypt.compareSync(password, member[0].password);
        if(!authenticated){
            return res.status(400).send('Password is incorrect')
        }
        delete member[0].password;
        req.session.member = member[0];
        res.status(202).send(req.session.member)
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
    getMember: (req, res) => {
        if(req.session.member){
            res.status(200).send(req.session.member)
        } else {
            res.status(200).send('No member on session')
        }
    }
}