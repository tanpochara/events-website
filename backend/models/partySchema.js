import mongoose from 'mongoose';

const partySchema = mongoose.Schema({
    creater: String,
    title: String,
    location : {
        type: String,
        default: ''
    },
    date : {
        type: String,
        default : '2022-6-27',
    },
    tag : {
        type : String,
        default: 'party'
    },
    countParti: {
        type: [String],
        default : []
    },
    max: {
        type: Number,
        default : 100
    }
})

const party = mongoose.model('Party', partySchema);

export default party;
