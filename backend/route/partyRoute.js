import express from 'express';
import mongoose from 'mongoose'
import partySchema from '../models/partyschema.js'
import auth from '../middleware/auth.js';

const router = express.Router();

//get parties
router.get('/', async (req,res) => {
    try {
        const parties = await partySchema.find();

        res.status(200).json(parties);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
});

//create parties
router.post('/', auth ,async (req,res) => {
    const { location, title , tag , date ,  max } = req.body;
    const creater = req.userId;

    const newParty = new partySchema({ creater : creater, location, title , tag , date , max , countParti : [creater] });
    
    try {
        await newParty.save();
        const ret = await partySchema.findOne({ creater : creater, location, title , tag , date , max , countParti : [creater] }).lean();

        res.status(200).json(ret);

    } catch (err) {
        res.status(404).json({message: err.message})
    }
});

//update the number of participants
router.patch('/join/:id', auth ,async (req,res) => {
    const { id: _id } = req.params;

    if (!req.userId) {
        return res.json({message : 'user token not found'})
    }
    if (!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('no party with the given id');
    };
    const party = await partySchema.findById(_id);

    const ind = party.countParti.indexOf(String(req.userId));
    if (ind == -1){
        party.countParti.push(req.userId);
    } else {
        party.countParti = party.countParti.filter((elem) => elem !== req.userId);
    }

    const updatedParty = await partySchema.findByIdAndUpdate(_id, party , { new : true});
    res.json(updatedParty);
});

//delete the party
router.delete('/:id', async (req,res) => {
    const { id : _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('no party with the given id')
    };
    await partySchema.findByIdAndRemove(_id);
    return res.json({message : 'post deleted'});
})

export default router;