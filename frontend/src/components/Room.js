import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'

const Room = () => {
    
    let [guestPlaybackState,setGuestPlaybackState] = useState('false');
    let [votesToSkip,setVotesToSkip] = useState(2);
    let [isHost,setIsHost] = useState('false') 
    let params = useParams();

    
    const getRoomDetails = () => {
        fetch('/api/get-room'+'?code='+params.roomCode).
            then(response => response.json()).
            then(data => {
                setVotesToSkip(data.votes_to_skip)
                setGuestPlaybackState(data.guest_can_pause)
                setIsHost(data.is_host)
            })
    }

    getRoomDetails();

    // useEffect(() => {
    //     console.log('state change.')
    //     getRoomDetails();
    //   }, [guestPlaybackState,votesToSkip,isHost]);

    
    return (
        <div>
            <h1>Room code : {params.roomCode}</h1> 
            <h1>Votes : {votesToSkip}</h1>
            <h2>Playback : {guestPlaybackState.toString()}</h2>
            <h3>Host : {isHost.toString()}</h3>
        </div>
    )
}

export default Room
