import React , { useState }from 'react';
import  { TextField , Button , Typography , Paper , Container} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { createParty } from '../actions/parties.js';
import { useNavigate } from 'react-router-dom';


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
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));

function Form({ currentId, setCurrentId}) {
  const classes = useStyle();
  const navigate = useNavigate();
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

  const handleSubmit = () => {
    dispatch(createParty(partyData));
    clear();
    navigate('/')
  };

  const handleChange = (e) => {
    setPartydata({...partyData,
      [e.target.name] : e.target.value});
  }

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
  
  return <Container maxWidth = 'xs'>
            <Paper className = {classes.paper} >
              <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'> create party</Typography>
                <TextField name='creator' variant = 'outlined' label = 'creater' fullWidth value = {partyData.creator} onChange = {handleChange}/>
                <TextField name='title' variant = 'outlined' label = 'name of a event' fullWidth value = {partyData.title} onChange = {handleChange}/>
                <TextField name='des' variant = 'outlined' label = 'description of a event' fullWidth value = {partyData.des} onChange = {handleChange}/>
                <TextField name='location' variant = 'outlined' label = 'location' fullWidth value = {partyData.location} onChange = {handleChange}/>
                <TextField name='tags' variant = 'outlined' label = 'meeting tags' fullWidth value = {partyData.tags} onChange = {handleChange}/>
                <TextField name='date' variant = 'outlined' label = 'event date' fullWidth value = {partyData.date} onChange = {handleChange}/>
                <TextField name='max' variant = 'outlined' label = 'max number of guest' fullWidth value = {partyData.max} onChange = {handleChange}/>
                <Button className = {classes.buttonSubmit} variant='contained' color='primary' size='large' fullWidth type='submit'> submit</Button>
                <Button className = {classes.buttonSubmit} variant='contained' color='secondary' size='large' fullWidth onClick={clear}> clear</Button>
              </form>
            </Paper>
          </Container>
}

export default Form;
