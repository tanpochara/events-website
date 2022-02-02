import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './route/route.js'

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: false }))
app.use(cors());

//first route to go on!!
app.use('/', routes);

const URI = "mongodb+srv://scb10x:S73tpXVHqULpm3Oc@cluster0.tjk8y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = 5000; //for local host;

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`the sever is running on port ${PORT}`)))
    .catch((err) => console.log(err.message));

