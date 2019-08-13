// importa o arquivo Dev.js
const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        //console.log(req.body);
        console.log('params.devId:', req.params.devId);
        console.log('header.user:', req.headers.user);

        const { devId } = req.params;
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if (!targetDev) {
            console.log('Dev not exists!');
            return res.status(400).json( { error: 'Dev not exists!' } );
        }

        // console.log('loggedDev', loggedDev);
        // console.log('targetDev', targetDev);

        if (targetDev.likes.includes(loggedDev._id)) {
            console.log('DEU MATCH!');
            const loggedSocket = req.connectedUsers[user];
            const targetSocket = req.connectedUsers[devId];

            if (loggedSocket){
                req.io.to(loggedSocket).emit('match', targetDev);
            }
    
            if (targetSocket){
                req.io.to(targetSocket).emit('match', loggedDev);
            }
        }

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);
    }
}