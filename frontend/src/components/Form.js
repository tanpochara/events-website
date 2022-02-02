import React , { useState }from 'react';
import  { TextField , Button , Typography , Paper} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { createParty } from '../actions/parties.js';


const useStyle =  makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    marginTop : '20px',
    marginBottom : '40px',
    marginLeft : '150px',
    marginRight : '150px',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));

function Form({ currentId, setCurrentId}) {
  const classes = useStyle();
  const [partyData, setPartydata] = useState({
    creator: '',
    title: '',
    des: '',
    location: '',
    tags: '',
    date: '',
    max: 0
  })
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(partyData);
    dispatch(createParty(partyData));
    clear();
  };

  const clear = () => {
    setCurrentId('');
    setPartydata({
      creator: '',
      title: '',
      des: '',
      location: '',
      tags: '',
      date: '',
      max: 0
    });
  };
  
  return <Paper className = {classes.paper} >
    <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
    <Typography variant='h6'> create party</Typography>
    <TextField name='creater' variant = 'outlined' label = 'creater' fullWidth value = {partyData.creator} onChange = {(e) => setPartydata({ ...partyData ,creator: e.target.value})}/>
    <TextField name='title' variant = 'outlined' label = 'name of a event' fullWidth value = {partyData.title} onChange = {(e) => setPartydata({ ...partyData ,title: e.target.value})}/>
    <TextField name='describtion' variant = 'outlined' label = 'description of a event' fullWidth value = {partyData.des} onChange = {(e) => setPartydata({ ...partyData ,des: e.target.value})}/>
    <TextField name='location' variant = 'outlined' label = 'location' fullWidth value = {partyData.location} onChange = {(e) => setPartydata({ ...partyData ,location: e.target.value})}/>
    <TextField name='tags' variant = 'outlined' label = 'meeting tags' fullWidth value = {partyData.tags} onChange = {(e) => setPartydata({ ...partyData ,tags: e.target.value})}/>
    <TextField name='date' variant = 'outlined' label = 'event date' fullWidth value = {partyData.date} onChange = {(e) => setPartydata({ ...partyData ,date: e.target.value})}/>
    <TextField name='max' variant = 'outlined' label = 'max number of guest' fullWidth value = {partyData.max} onChange = {(e) => setPartydata({ ...partyData ,max: e.target.value})}/>
    <Button className = {classes.buttonSubmit} variant='contained' color='primary' size='large' fullWidth type='submit'> submit</Button>
    <Button className = {classes.buttonSubmit} variant='contained' color='secondary' size='large' fullWidth onClick={clear}> clear</Button>
    </form>
  </Paper>
}

export default Form;
