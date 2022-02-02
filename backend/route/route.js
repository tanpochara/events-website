import express from 'express';
import mongoose from 'mongoose'
import Schema from '../models/schema.js'

const router = express.Router();

//get parties
router.get('/', async (req,res) => {
    try {
        const parties = await Schema.find();

        res.status(200).json(parties);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
});

//create parties
router.post('/', async (req,res) => {
    const { creater, location, title , tags , des , max } = req.body;

    const newParty = new Schema({ creater, location, title , tags , des , max });
    const id = newParty
    try {
        await newParty.save()
        const ret = await Schema.findById(id);
        res.json(ret);

    } catch (err) {
        res.status(404).json({message: err.message})
    }
});

//update the number of participants
router.patch('/join/:id', async (req,res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('no party with the given id');
    };
    const prevParty = await Schema.findById(_id);
    const updatedParty = await Schema.findByIdAndUpdate(_id , {countParti : prevParty.countParti+1} , { new : true});

    res.json(updatedParty);
});

//delete the party
router.delete('/:id', async (req,res) => {
    const { id : _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('no party with the given id')
    };
    await Schema.findByIdAndRemove(_id);
    return res.json({message : 'post deleted'});
})

export default router;