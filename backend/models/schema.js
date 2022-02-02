import mongoose from 'mongoose';

const partySchema = mongoose.Schema({
    creater: String,
    title: String,
    des: {
        type: String,
        default: ''
    },
    location : {
        type: String,
        default: ''
    },
    date : {
        type: Date,
        default : Date.now()
    },
    tag : {
        type : String,
        default: 'party'
    },
    countParti: {
        type: Number,
        default : 1
    },
    max: {
        type: Number,
        default : 100
    }
})

const party = mongoose.model('Party', partySchema);

export default party;
