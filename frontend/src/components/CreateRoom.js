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
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

const CreateRoom = () => {
  const default_votes = 2;
  let [guestPlaybackState, setGuestPlaybackState] = useState("true");
  let [votesToSkip, setVotesToSkip] = useState(default_votes);
  let history = useHistory();

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

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align='center'>
        <Typography component='h4' variant='h4'>
          Create A Room
        </Typography>
      </Grid>
      <Grid item xs={12} align='center'>
        <FormControl component='fieldset'>
          <FormHelperText>Guest Control of Playback State</FormHelperText>
          <RadioGroup
            row
            defaultValue='true'
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
            defaultValue={default_votes}
            inputProps={{
              min: 1,
              style: { textAlign: "center" },
            }}
            onChange={(e) => setVotesToSkip(e.target.value)}
          />
          <FormHelperText>Votes required to skip a song</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} align='center'>
        <Button
          color='primary'
          variant='contained'
          to='/create'
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
  );
};

export default CreateRoom;
