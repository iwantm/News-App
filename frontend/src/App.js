import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import MenuBar from './MenuBar'

import "./App.css";



class App extends Component {
  render() {
    return (
      <BrowserRouter>
    {/* <BaseLayout /> */}
        <MenuBar/>
        
        {/* <Scroller/> */}
      </BrowserRouter>
    );
  }
}

export default App;
