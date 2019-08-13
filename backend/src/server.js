// utiliza a biblioteca express
const express = require('express');
// utiliza a biblioteca mongoose
const mongoose = require('mongoose');
// importa a biblioteca cors
const cors = require('cors');
// importa o arquivo routes.js
const routes = require('./routes');

// configura conexao com o banco mongodb do site 'mongodb atlas'
const dbUser = 'omnistack';
const dbSenha = 'omnistack';
mongoose.connect(`mongodb+srv://${dbUser}:${dbSenha}@cluster0-ojzbo.mongodb.net/omnistack8?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
);

// cria um servidor
const app = express();
// cria um web socket
const server = require('http').Server(app);
// utiliza a biblioteca socket.io
const io = require('socket.io')(server);

const connectedUsers = {};

io.on('connection', (socket) => {
    console.log('socket.id', socket.id);
    const { user } = socket.handshake.query;
    console.log('user', user);

    connectedUsers[user] = socket.id;
});

app.use( (req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;
    return next();
});

app.use(cors()); // utilizar cors
app.use(express.json()); // configura a saida do metodos do webservice como json
app.use(routes); // para utilizar o conteudo da variavel routes

server.listen(3333); // ouve a porta 3333





