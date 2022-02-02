import React , {useState} from 'react';
import { Container , Typography , TextField , Button , Grid , Paper , Avatar , makeStyles} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

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



function Register() {
    const [userData , setUserData] = useState({
        fullName : '',
        lastName : '',
        email : '',
        password : '',
    })
    const classes = useStyle();

  return <Container maxWidth = 'xs'>    
            <Paper className = {classes.paper}>
                <Avatar>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant = 'h5' className={classes.typo}> Login </Typography>
                <form className= {`${classes.form}`}> 
                    <Grid container spacing = {2}>
                        <Grid item xs = {12} sm = {6}>
                            <TextField name = 'fullname'
                            fullWidth
                            variant = 'outlined'
                            label = 'full name'
                            value = {userData.fullName}
                            onChange = {(e) => ({fullName: setUserData(e.target.value)})} />
                        </Grid>
                        <Grid item xs = {12} sm = {6}>
                            <TextField name = 'lastname'
                            fullWidth
                            variant = 'outlined'
                            label = 'lasnt name'
                            value = {userData.lastName}
                            onChange = {(e) => ({lastName: setUserData(e.target.value)})} />
                        </Grid>
                        <Grid item xs = {12}>
                            <TextField name = 'email' 
                            fullWidth
                            variant = 'outlined' 
                            label = 'email' 
                            value = {userData.email} 
                            onChange = {(e) => ({email: setUserData(e.target.value)})} /> 
                        </Grid>
                        <Grid item xs = {12}>
                            <TextField name = 'password' 
                            fullWidth
                            variant = 'outlined' 
                            label = 'password' 
                            value = {userData.password}
                            type = 'password' 
                            onChange = {(e) => ({password: setUserData(e.target.value)})} />
                        </Grid>
                    </Grid>
                    <Button 
                    className={classes.buttonSubmit}
                    variant='contained' 
                    color='primary' 
                    size='large' 
                    fullWidth 
                    type='submit'> submit</Button>
                </form>
            </Paper>
        </Container>;
}

export default Register;
