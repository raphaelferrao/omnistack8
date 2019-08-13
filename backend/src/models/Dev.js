// importa alguns itens da biblioteca mongoose
const { Schema, model } = require('mongoose');

// define a estrutura do banco
const DevSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        user: {
            type: String,
            required: true
        },
        bio: String,
        avatar: {
            type: String,
            required: true
        },
        likes: [{
            type: Schema.Types.ObjectId,
            ref: 'Dev'
        }],
        dislikes: [{
            type: Schema.Types.ObjectId,
            ref: 'Dev'
        }],
    },
    {
        timestamps: true // cria as colunas de timestamp de criacao e alteracao
    }
);

module.exports = model('Dev', DevSchema);
