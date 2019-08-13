// utiliza a biblioteca axios
const axios = require('axios');
// importa o arquivo Dev.js
const Dev = require('../models/Dev');



module.exports = {
    async index(req, res) {
        console.log('header.user:', req.headers.user);

        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);

        const users = await Dev.find({
            $and: [
                { _id: { $ne: user } }, // _id eh diferente do user
                { _id: { $nin: loggedDev.likes } }, // _id nao esta na lista de likes
                { _id: { $nin: loggedDev.dislikes } }, // _id nao esta na lista de dislikes
            ],
        });

        return res.json(users);
    },

    async store(req, res) {
        console.log(req.body);

        // obtendo o atributo username do json de entrada
        const { username } = req.body;

        const userExists = await Dev.findOne( { user: username } );
        console.log(`userExists: ${userExists}`);

        if (userExists) {
            return res.json(userExists);
        }

        // chama a api do github
        const response = await axios.get(`https://api.github.com/users/${username}`);
        console.log(response.data);

        // obtendo os atributos name, bio, avatar_url do json de saida da api do github
        const { name, bio, avatar_url: avatar } = response.data;

        const devCreated = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        });

        return res.json(devCreated);
    }
};