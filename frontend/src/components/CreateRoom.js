import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Collapse
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert"
import { Link, useHistory } from "react-router-dom";

const CreateRoom = ({ update=false, votesToSkip=2, guestCanPause=true, roomCode=null, updateCallback=() => {}}) => {
 
  var [guestPlaybackState, setGuestPlaybackState] = useState(guestCanPause);
  var [votesToSkip, setVotesToSkip] = useState(votesToSkip);
  let history = useHistory();
  let [successMsg,setSuccessMsg] = useState('')
  let [errorMsg,setErrorMsg] = useState('')

  const handleCreateRoomBtn = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestPlaybackState,
      }),
    };

    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => history.push('room/'+data.code))
  };

  const handleUpdateRoomBtn = () => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestPlaybackState,
        code : roomCode
      }),
    };

    fetch("/api/update-room", requestOptions)
      .then((response) => {
        if(response.ok){
          setSuccessMsg('Room Updated Succesfully...')
        }
        else{
          setErrorMsg('Error updating Room...')
        }
        updateCallback();
      })
     
  }

  const renderCreateButtons = () => {
    return(
      <Grid container spacing={1}>
        <Grid item xs={12} align='center'>
        <Button
          color='primary'
          variant='contained'
          onClick={handleCreateRoomBtn}
        >
          Create a room
        </Button>
      </Grid>

      <Grid item xs={12} align='center'>
        <Button
          color='secondary'
          variant='contained'
          to='/'
          component={Link}
        >
          Go Back
        </Button>
      </Grid>
      </Grid>
    )
  }

  const renderUpdateButtons = () => {
    return(
    <Grid item xs={12} align='center'>
      <Button
        color='primary'
        variant='contained'
        onClick={handleUpdateRoomBtn}
      >
        Update Room
      </Button>
    </Grid>
    )
  }

  const title = update?"Update Room":"Create a Room"
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Collapse in={successMsg!="" || errorMsg!=""}>
         {successMsg!=""?(<Alert severity="success" onClose={() => setSuccessMsg('')}>{successMsg}</Alert>):(<Alert severity="errpr" onClose={() => setErrorMsg('')}>{errorMsg}</Alert>)}
        </Collapse>
      </Grid>
      <Grid item xs={12} align='center'>
        <Typography component='h4' variant='h4'>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} align='center'>
        <FormControl component='fieldset'>
          <FormHelperText>Guest Control of Playback State</FormHelperText>
          <RadioGroup
            row
            defaultValue={guestCanPause.toString()}
            onChange={(e) =>
              e.target.value === "true"
                ? setGuestPlaybackState(true)
                : setGuestPlaybackState(false)
            }
          >
            <FormControlLabel
              value='true'
              control={<Radio color='primary' />}
              label='Play/Pause'
              labelPlacement='bottom'
            />
            <FormControlLabel
              value='false'
              control={<Radio color='secondary' />}
              label='No Control'
              labelPlacement='bottom'
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align='center'>
        <FormControl>
          <TextField
            required={true}
            type='number'
            defaultValue={votesToSkip}
            inputProps={{
              min: 1,
              style: { textAlign: "center" },
            }}
            onChange={(e) => setVotesToSkip(e.target.value)}
          />
          <FormHelperText>Votes required to skip a song</FormHelperText>
        </FormControl>
      </Grid>
      {update?renderUpdateButtons():renderCreateButtons()}
    </Grid>
  );
};

export default CreateRoom;
