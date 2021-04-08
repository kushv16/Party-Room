import React from "react"
import {BrowserRouter as Router,Switch,Route,Link,Redirect} from "react-router-dom"
import CreateRoom from "./CreateRoom"
import JoinRoom from "./JoinRoom"
import Room from "./Room"

const Home = () => {
  return(
    <Router>
      <Switch>
        <Route path='/join' component={JoinRoom}/>
        <Route path='/create' component={CreateRoom}/>
        <Route path='/room/:roomCode' component={Room}/>
      </Switch>
    </Router>
  )
}

export default Home