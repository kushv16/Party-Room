import React from "react"
import {useState,useEffect} from "react"
import {Button, FormControl, FormControlLabel, FormHelperText, Grid, Radio, RadioGroup, TextField, Typography} from "@material-ui/core"
import {Link} from "react-router-dom"


const CreateRoom = () => {

  const default_votes = 2

  let [guestPlaybackState,setGuestPlaybackState] = useState('true')

  let [votesToSkip, setVotesToSkip] = useState(default_votes)

  // const handleGuestPlaybackState = e => {
  //   e.target.value === 'true' ? setGuestPlaybackState(true) : setGuestPlaybackState(false)
  //   // console.log(setGuestPlaybackState)
  // }

  // const handleVotesToSkip = e => {
  //   setVotesToSkip(e.target.value)
  //   // console.log(setVotesToSkip)
  // }
  

  const handleCreateRoomBtn = () => {
    // console.log(guestPlaybackState)
    const reqestOptions = {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(
        {
          votes_to_skip: votesToSkip,
          guest_can_pause: guestPlaybackState
        }
      )
    }

    fetch('/api/create-room',reqestOptions)
      .then(response => response.json())
      .then(data => console.log(data))
  }

  // useEffect(() => {
  //   console.log(votesToSkip);
  // });

  return(

    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component='h4' variant='h4'>
          Create A Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component='fieldset'>
          <FormHelperText>
            Guest Control of Playback State
          </FormHelperText>
          <RadioGroup row defaultValue='true' onChange={e => e.target.value === 'true' ? setGuestPlaybackState(true) : setGuestPlaybackState(false)}>
            <FormControlLabel value='true' 
                              control={<Radio color='primary'/>} 
                              label='Play/Pause' 
                              labelPlacement='bottom'/>
            <FormControlLabel value='false' 
                              control={<Radio color='secondary'/>} 
                              label='No Control' 
                              labelPlacement='bottom'/>
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField required={true} 
                      type="number" 
                      defaultValue={default_votes}
                      inputProps={{
                        min:1,
                        style:{textAlign:"center"},
                      }}
                      onChange={e => setVotesToSkip(e.target.value)}
                      />
          <FormHelperText>
            Votes required to skip a song
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="primary" variant="contained" to='/' onClick={handleCreateRoomBtn}>
          Create a room
        </Button>
        </Grid>

        <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" to='/join_room' component={Link}>
          Go Back
        </Button>                  
      </Grid>
    </Grid>
  )
}

export default CreateRoom