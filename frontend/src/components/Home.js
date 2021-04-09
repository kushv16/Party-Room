import React,{useEffect,useState} from "react"
import {BrowserRouter as Router,Switch,Route,Link,Redirect} from "react-router-dom"
import CreateRoom from "./CreateRoom"
import JoinRoom from "./JoinRoom"
import Room from "./Room"
import {Grid, Button, ButtonGroup, Typography} from "@material-ui/core"



const Home = () => {
  let [roomCode,setroomCode] = useState(null)

  //https://dev.to/stlnick/useeffect-and-async-4da8
  useEffect(() => {
    (async () => {
      fetch('/api/user-in-room')
      .then(response => response.json())
      .then(data => {
        setroomCode(data.code)
      })
    })()
  },[])

  const clearRoomCode = () => {
    setroomCode(null)
  }

  const HomePageRender = () => {
    return(
      <Grid container spacing={2}>
          <Grid item xs={12} alignn="center">
              <Typography
              component="h2"
              variant="h2"
              align="center">
                Room Party
              </Typography>
            </Grid>
            <Grid item xs={12} align="center">
              <ButtonGroup disableElevation variant="contained" color="primary">
                <Button
              variant="contained"
              color="primary"
              to="/create"
              component={Link}
              >
                Create Room
              </Button>
            
              <Button
              variant="contained"
              color="secondary"
              to="/join"
              component={Link}
              >
                Join Room
              </Button>
              </ButtonGroup>
              </Grid>
          </Grid>
    )
  }

  return(
    <Router>
      <Switch>
        <Route exact path="/" render={() => {
          return roomCode?(<Redirect to={`room/${roomCode}`}/>):(<HomePageRender/>)
        }}>
        </Route>
        <Route path='/join' component={JoinRoom}/>
        <Route path='/create' component={CreateRoom}/>
        <Route path='/room/:roomCode' 
          render={ () => {
            return <Room leaveRoomCallback={clearRoomCode}/>
          }}
        />
      </Switch>
    </Router>
  )
}

export default Home