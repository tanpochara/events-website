import React from 'react';
import { Card , CardContent , CardMedia , Typography , Button , CardActionArea , CardActions } from '@material-ui/core';
import img from '../Assets/party.jpeg';
import { useDispatch } from 'react-redux';
import { deleteParty, joinParty } from '../actions/parties';

function PartyCard({ party , setCurrentId , currentId }) {
    //const classes = useStyle();
    const dispatch = useDispatch();
    
    const join = (e) => {
      e.preventDefault();
      dispatch(joinParty(party._id));
      if (party.countParti+1 >= party.max){
        dispatch(deleteParty(party._id));
      } ;
      setCurrentId(party._id);
    };
  

  return (<Card>
  <CardActionArea>
    <CardMedia
      component="img"
      height="140"
      image={img}
      alt={party.title}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {party.title}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {party.des}
      </Typography>
    </CardContent>
  </CardActionArea>
  
  <CardActions>
    <Button size="small" color="primary" variant = 'outlined' onClick = {join}>
      Join
    </Button>
    &nbsp;
    <Typography vaiant = "body2" color = "textPrimary"> {`${party.countParti} out of ${party.max}`} </Typography>
  </CardActions>
</Card>);
}

export default PartyCard;
