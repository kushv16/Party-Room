import React,{useState,useEffect} from 'react'
import {useParams,useHistory} from 'react-router-dom'
import {Typography,Button,Grid} from '@material-ui/core'

const Room = ({leaveRoomCallback}) => {
    
    let [guestPlaybackState,setGuestPlaybackState] = useState('false');
    let [votesToSkip,setVotesToSkip] = useState(2);
    let [isHost,setIsHost] = useState('false') 
    let params = useParams();
    let history = useHistory();
    
    const getRoomDetails = () => {
        fetch('/api/get-room'+'?code='+params.roomCode).
            then(response => {
                if(!response.ok){
                    leaveRoomCallback();
                    history.push('/')

                }
                return response.json()
            }).
            then(data => {
                setVotesToSkip(data.votes_to_skip)
                setGuestPlaybackState(data.guest_can_pause)
                setIsHost(data.is_host)
            })
    }
    getRoomDetails();
    
    const handleLeaveRoomButton = () => {

        const requestOptions = {
            method:"POST",
            headers:{"Content-Type":"application/json"}
        }

        fetch("/api/leave-room",requestOptions)
        .then(response => {
            leaveRoomCallback();
            history.push('/')
        })
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant="h2" component="h2">
                    Room code : {params.roomCode}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Votes : {votesToSkip}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Playback : {guestPlaybackState.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Host : {isHost.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" onClick={handleLeaveRoomButton}>
                    Leave Room
                </Button>
            </Grid>

        </Grid>
    )
}

export default Room
