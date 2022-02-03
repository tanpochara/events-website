import React , {useState} from 'react';
import { Container , Typography , TextField , Button , Grid , Paper , Avatar , makeStyles} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login , signup } from '../actions/auth';

const useStyle =  makeStyles((theme) => ({
    paper : {
      padding: theme.spacing(2),
      marginTop : theme.spacing(2),
      marginBottom : theme.spacing(1),
      display : 'flex',
      flexDirection : 'column',
      alignItems : 'center',
    },
    typo : {
        marginBottom : theme.spacing(3)
    },
    form : {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    buttonSubmit : {
      marginTop : theme.spacing(2),
      marginBottom: 10,
    },
  }));




function Login() {
    const [userData , setUserData ] = useState({
        firstName : '',
        lastName : '',
        email : '',
        password : '',
    });
    const [haveAccount , setHaveAccount ] = useState(true)
    const classes = useStyle();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAuth = (e) => {
      if (haveAccount){
        dispatch(login(userData,navigate));
      } else {
        dispatch(signup(userData,navigate))
      }
      navigate('/');
    }

    const handleChange = (e) => {
      setUserData({
        ...userData,
        [e.target.name] : e.target.value
      })
    };

    const switchPage = () => {
      setHaveAccount((prev) => !prev);
      setUserData({
        firstName : '',
        lastName : '',
        email : '',
        password : '',
      });
    }

  return <Container maxWidth = 'xs'>    
            <Paper className = {classes.paper}>
                <Avatar>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant = 'h5' className={classes.typo}> Login </Typography>
                <form className= {`${classes.form}`} onSubmit={handleAuth}> 
                    <Grid container spacing = {2}>
                        {!haveAccount && (
                          <>
                            <Grid item xs = {12} sm = {6}>
                              <TextField name = 'firstName'
                              fullWidth
                              variant = 'outlined'
                              label = 'first name'
                              value = {userData.firstName}
                              onChange={handleChange} />
                            </Grid>
                            <Grid item xs = {12} sm = {6}>
                              <TextField name = 'lastName'
                              fullWidth
                              variant = 'outlined'
                              label = 'last name'
                              value = {userData.lastName}
                              onChange={handleChange} />
                            </Grid>
                          </>
                        )}
                        <Grid item xs = {12}>
                            <TextField name = 'email' 
                            fullWidth
                            variant = 'outlined' 
                            label = 'email' 
                            value = {userData.email} 
                            onChange = {handleChange} /> 
                        </Grid>
                        <Grid item xs = {12}>
                            <TextField name = 'password' 
                            fullWidth
                            variant = 'outlined' 
                            label = 'password' 
                            value = {userData.password}
                            type = 'password' 
                            onChange = {handleChange} />
                        </Grid>
                        <Button 
                        className={classes.buttonSubmit}
                        variant='contained' 
                        color='primary' 
                        size='large' 
                        fullWidth 
                        type='submit'> submit</Button>
                        <Grid container justifyContent='flex-end'>
                          <Button onClick={switchPage}>
                            {haveAccount ? "Don't have an account ? Sign Up" : "Already have an account ? Sign In"}
                          </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
         </Container>;
}

export default Login;
