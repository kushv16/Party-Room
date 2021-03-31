import React from "react"
import {BrowserRouter as Router,Switch,Route,Link,Redirect} from "react-router-dom"
import CreateRoom from "./CreateRoom"
import JoinRoom from "./JoinRoom"

const Home = () => {
  return(
    <Router>
      <Switch>
        <Route path='/join_room' component={JoinRoom}></Route>
        <Route path='/create_room' component={CreateRoom}></Route>
      </Switch>
    </Router>
  )
}

export default Home