import React from 'react';
import { Card , CardContent , CardMedia ,Box, Typography , Button ,IconButton, CardActions , makeStyles} from '@material-ui/core';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import ScheduleRoundedIcon from '@material-ui/icons/ScheduleRounded';
import img from '../Assets/party.jpeg';
import { useDispatch } from 'react-redux';
import { deleteParty, joinParty } from '../actions/parties';
import decode from 'jwt-decode';




const useStyle = makeStyles((theme) => ({
  div : {
    display : 'flex' ,
    flexDirection : 'row' ,
    alignItems : 'center',
    marginTop : '10px',
  },
  icon : {
    paddingRight : theme.spacing(1.5),
    paddingTop : theme.spacing(0),
  },
  box : {
    display : 'flex',
    flexGrow : 2,
    alignItems : 'center'
  },
  textAction : {
    paddingLeft : '10px'
  }
}));

function PartyCard({ party , setCurrentId , user }) {
    const classes = useStyle();
    const dispatch = useDispatch();
    const userToken = user?.token;
    let didJoin;
    let userId;
    if(userToken){
      const decodedToken = decode(userToken);
      userId = decodedToken.id;
      didJoin = party.countParti.indexOf(userId) !== -1;
    }


    const join = (e) => {
      e.preventDefault();
      dispatch(joinParty(party._id));
      if (party.countParti.length >= party.max){
        dispatch(deleteParty(party._id));
      } ;
      setCurrentId(party._id);
    };
  
  return (<Card>
    <CardMedia
      component="img"
      height="140"
      image={img}
      alt={party.title}
    />
    <CardContent >
      <Typography gutterBottom variant="h5" component="div">
        {party.title}
      </Typography>

      <div className={classes.div}>
        <ScheduleRoundedIcon fontSize = 'small' className={classes.icon}/> 
        <Typography variant="subtitle1" color="inherit"> {party.date} </Typography>
      </div>
      
      <div className={classes.div}>
        <LocationOnRoundedIcon fontSize = 'small' className={classes.icon} /> 
        <Typography variant="subtitle1" color="inherit"> {party.location} </Typography>
      </div>

    </CardContent>
  
  <CardActions>
  <Box className={classes.box}>
    <Button size="small" color="primary" variant = 'outlined' onClick = {join}>
      {didJoin ? 'undo join' : 'join'}
    </Button>
    &nbsp;
    <Typography vaiant = "body2" color = "textPrimary" className={classes.textAction}> {`${party.countParti.length} out of ${party.max}`} </Typography>
    </Box>
    {(party.creater === userId) && 
    <Box>
      <IconButton onClick = {() => {dispatch(deleteParty(party._id))}} >
        <DeleteRoundedIcon />
      </IconButton>
    </Box>}
  </CardActions>
</Card>);
}

export default PartyCard;
