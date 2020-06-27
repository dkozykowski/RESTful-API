const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    noteID: {
        type: String
    },
    priority: {
        type: Number,
        default: 1
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now,
    },
    modified: {
        type: Date,
        default: Date.now,
    },
    version: {
        type: Number,
        default: 1,
        //select: false
    },
    status: {
        type: String,
        default: 'Active',
        select: false
    }
})

module.exports = mongoose.model('Posts', PostSchema);