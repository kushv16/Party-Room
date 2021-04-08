import React from "react"
import {BrowserRouter as Router,Switch,Route,Link,Redirect} from "react-router-dom"
import CreateRoom from "./CreateRoom"
import JoinRoom from "./JoinRoom"
import Room from "./Room"
import {Grid, Button} from "@material-ui/core"

const Home = () => {
  return(
    <Router>
      <Switch>
        <Route exact path="/">
          <Grid container spacing={2}>
            <Grid item xs={6} align="center">
              <Button
              variant="contained"
              color="primary"
              to="/create"
              component={Link}
              >
                Create Room
              </Button>
            </Grid>
            <Grid item xs={6} alignn="center">
              <Button
              variant="contained"
              color="primary"
              to="/join"
              component={Link}
              >
                Join Room
              </Button>
            </Grid>
          </Grid>
          </Route>
        <Route path='/join' component={JoinRoom}/>
        <Route path='/create' component={CreateRoom}/>
        <Route path='/room/:roomCode' component={Room}/>
      </Switch>
    </Router>
  )
}

export default Home