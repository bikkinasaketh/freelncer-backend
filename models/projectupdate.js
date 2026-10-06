const mongoose = require('mongoose');

const projectUpdateSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    progress: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ProjectUpdate', projectUpdateSchema);