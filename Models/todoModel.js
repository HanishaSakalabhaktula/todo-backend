const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//defining Schema
const todoSchema = new Schema({
    creatorId : {
        type: ObjectId,
        required: true
    },
    title : {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Todo', todoSchema);