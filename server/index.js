require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      socket = require('socket.io'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      authCtrl = require('./controllers/authController'),
      groupCtrl = require('./controllers/groupController'),
      app = express()
      io = socket(app.listen(SERVER_PORT, () => console.log(`Chatterbox at ${SERVER_PORT}`)));

app.use(express.json())

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 365}
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('db connected')
})

//auth endpoints
app.post('/api/register', authCtrl.register);
app.post('/api/login', authCtrl.login);
app.post('/api/logout', authCtrl.logout);
app.get('/api/member', authCtrl.getMember);

//group endpoints
app.get('/api/groups/:id', groupCtrl.getGroups);
app.post('/api/group', groupCtrl.createGroup);


//sockets
io.on('connection', socket => {
    console.log('member connected')
    socket.on('join room', async data => {
        const {group} = data,
              db = req.app.get('db');
        
        console.log("Room joined", room);

        let room = await db.message.get_message_group({id: group});
        let messages = await db.message.message_history({id: group});
        socket.join(room);
        io.to(room).emit('room joined', messages);
    });
    socket.on("message sent", async data => {
        const { group, sender, message } = data;
        const db = app.get("db");
        await db.message.create_message({ id: group, sender, message });
        let messages = await db.message.message_history({ id: group });
        io.to(data.group).emit("message dispatched", messages);
      });
    
      socket.on("disconnect", () => {
        console.log("User Disconnected");
      });
});