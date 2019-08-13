// utiliza as bibliotecas express
const express = require('express');
// importa o DevController
const DevController = require('./controllers/DevController');
// importa o LikeController
const LikeController = require('./controllers/LikeController');
// importa o DislikeController
const DislikeController = require('./controllers/DislikeController');

// para configurar as rotas
const rotas = express.Router();

/*
// trata requisicao do tipo localhost:3333/?name=Strawlley
rotas.get('/', (req, res) => {
    return res.json( { message: `Hello, ${req.query.name}!` } );
});
*/

// configurando /devs para usar o metodo store do DevController
rotas.post('/devs', DevController.store);
// configurando /devs para usar o metodo store do DevController
rotas.get('/devs', DevController.index);

// configurando /devs/{id}/likes para usar o metodo store do LikeController
rotas.post('/devs/:devId/likes', LikeController.store);
// configurando /devs/{id}/dislikes para usar o metodo store do DislikeController
rotas.post('/devs/:devId/dislikes', DislikeController.store);

// exporta a variavel rotas para ser utilizada em outros lugares do projeto
module.exports = rotas;