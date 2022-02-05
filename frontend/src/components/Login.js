import React , {useState} from 'react';
import { Container , Typography , TextField , Button , Checkbox , Grid , Paper , FormControlLabel , Avatar , makeStyles} from '@material-ui/core';
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
    const [haveAccount , setHaveAccount ] = useState(true);
    const [agreeTerms , setAgreeTerms] = useState(false);
    const classes = useStyle();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleAuth = (e) => {
      e.preventDefault();
      if (haveAccount){
        dispatch(login(userData,navigate));
      } else {
        if (!agreeTerms){
          alert('please agree our terms and condition');
        } else{
          const regx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
          console.log(regx.test(userData.password));
          if (!regx.test(userData.password)) {
            alert("you have not followed the password restriction")
          } else if (!userData.email.includes('@')) {
            alert("invalid email address");
          }
          else {
            dispatch(signup(userData,navigate))
          }
        }
      }
      navigate('/');
    }

    const handleChange = (e) => {
      setUserData({
        ...userData,
        [e.target.name] : e.target.value
      })
    };

    const handleTerms = (e) => {
      setAgreeTerms(e.target.checked);
    }

    const switchPage = () => {
      setHaveAccount((prev) => !prev);
      setUserData({
        firstName : '',
        lastName : '',
        email : '',
        password : '',
      });
    }

  return <>

          <Container maxWidth = 'xs'>    
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
                            helperText = {haveAccount ? null : 'minimun of 8 character, contain Upper, Lower case and a number'}
                            fullWidth
                            variant = 'outlined' 
                            label = 'password' 
                            value = {userData.password}
                            type = 'password' 
                            onChange = {handleChange} />
                        </Grid>
                        {!haveAccount && (<Grid container justifyContent='flex-end'>
                          <FormControlLabel
                          value="agree"
                          control={<Checkbox checked = {agreeTerms} onChange={handleTerms} />}
                          label = 'I agree terms and codition of the website' 
                          labelPlacement="end" />
                        </Grid>)}
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
        </>
}

export default Login;
