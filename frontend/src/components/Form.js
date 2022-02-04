import React , { useState }from 'react';
import  { TextField , Button , Typography , Paper , Container , FormControl , InputLabel , Select , MenuItem , Collapse} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
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
  formControl : {
    margin : theme.spacing(1),
    padding : theme.spacing(0),
  }
}));

function Form({ currentId, setCurrentId}) {
  const classes = useStyle();
  const navigate = useNavigate();
  const [partyData, setPartydata] = useState({
    title: '',
    location: '',
    tag: '',
    date : '2022-02-06',
    max: 0
  })
  const [alert , setAlert ] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createParty(partyData));
    setAlert(true);
    clear();
    //navigate('/')
  };

  const handleChange = (e) => {
    e.preventDefault();
    setPartydata({...partyData,
      [e.target.name] : e.target.value});
  }

  const clear = () => {
    setCurrentId('');
    setPartydata({
      title: '',
      location: '',
      tag: '',
      date : '2022-02-06',
      max: 0
    });
  };
  
  return <>
          <Collapse in = {alert}>
            <Alert action = {
              <Button color='inherit' size='small' onClick={() => navigate('/')}> Back to main page </Button>
            }>
              Sucessfully create party
            </Alert>
          </Collapse>
          <Container maxWidth = 'xs'>
            <Paper className = {classes.paper} >
              <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'> create party</Typography>
                <TextField name='title' variant = 'outlined' label = 'name of a event' fullWidth value = {partyData.title} onChange = {handleChange}/>
                <TextField name='location' variant = 'outlined' label = 'location' fullWidth value = {partyData.location} onChange = {handleChange}/>
                <TextField name='date' type = 'date' variant = 'outlined' label = 'event date' fullWidth value = {partyData.date} onChange = {handleChange}/>
                <TextField name='max' variant = 'outlined' label = 'max number of guest' fullWidth value = {partyData.max} onChange = {handleChange}/>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel id="selectTag" className = {classes.inputText}>tag</InputLabel>
                    <Select
                    labelId="selectTag"
                    name = 'tag'
                    value={partyData.tag}
                    onChange={handleChange}>
                      <MenuItem value={''}> None </MenuItem>
                      <MenuItem value={'social'}>Social event</MenuItem>
                      <MenuItem value={'party'}>night party</MenuItem>
                      <MenuItem value={'car'}>car lover meeting</MenuItem>
                    </Select>
                 </FormControl>
                <Button className = {classes.buttonSubmit} variant='contained' color='primary' size='large' fullWidth type='submit'> submit</Button>
                <Button className = {classes.buttonSubmit} variant='contained' color='secondary' size='large' fullWidth onClick={clear}> clear</Button>
              </form>
            </Paper>
          </Container>
        </>
}

export default Form;
