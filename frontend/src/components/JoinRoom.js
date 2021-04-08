import React, { useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";

import { Link, useHistory } from "react-router-dom";


const JoinRoom = () => {

  let history = useHistory();

  const[roomCode,setRoomCode] = useState('');
  const[errorMessage,setErrorMessage] = useState('');
 

  const handleJoinRoomButton = () => {

    const requestOptions = {
      method : "POST",
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify({
        code : roomCode
      })
    }
    fetch("/api/join-room",requestOptions)
      .then(response => {
        if(response.ok){
         history.push('room/'+roomCode)
        }
        else{
          setErrorMessage("Room not Found")
        }
      })
      .catch(err => {
        console.log(err)
      })
      
  }

  return(
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Join a Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          error={errorMessage}
          label="Code"
          placeholder="Enter a Room Code.."
          value={roomCode}
          helperText={errorMessage}
          variant="outlined"
          onChange={(e) => setRoomCode(e.target.value)}
        />        
      </Grid>
      <Grid item xs={12} align="center">
        <Button 
        color="primary"
        variant="contained"
        onClick={handleJoinRoomButton}>
          Enter Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button
        color="secondary"
        variant="contained"
        to="/"
        component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  )

  
}

export default JoinRoom