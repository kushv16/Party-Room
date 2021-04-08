import React from 'react'
import ReactDom from "react-dom"
import Home from "./Home"


const App = () => {
  return (
    <div className="center">
      <Home/> 
    </div>
  )
}

ReactDom.render(<App/>,document.getElementById("app"))
