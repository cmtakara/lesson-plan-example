const mongoose = require('mongoose');

const inputSchema = new mongoose.Schema({
    description: { type: String, required: true},
    type: { type: String, required: true, enum: ['link', 'file', 'noLoc']},
    location: { type: String, required: true}
})

const lessonSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    subject: { type: String, required: true, enum: ['Math', 'Science', 'English', 'Social']},
    module: { type: String },
    topic: { type: String },
    warmUp: [inputSchema],
    introduction: [inputSchema],
    presentation: [inputSchema],
    practice:  [inputSchema],
    evaluation:  [inputSchema],
    otherResources:  [inputSchema],
}, {
    timestamps: true
})

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson