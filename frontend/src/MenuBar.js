import React, { Component } from "react";
import FeedList from "./Feed/FeedList.js";
import AddFeed from "./Feed/AddFeed.js";
import ArticleList from "./Article/ArticleList.js";
import Login from "./User/LogIn.js";
import Register from "./User/Register.js"
import { Route } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import UserPopover from "./User/Popover.js"
import Profile from "./User/Profile.js"



class MenuBar extends Component {
  state = {
    username: " ",
    loggedIn: false,

  };

  componentDidMount() {
    //initial request is sent
    this.isUserLoggedIn()
    this.setState({
      username: localStorage.getItem('user')
    })

  }

  isUserLoggedIn = () => {
    if(localStorage.getItem('token')){
      this.setState({loggedIn: true})
    }
    else{
      this.setState({loggedIn: false})
    }
  }



  // refreshRequired = () => {
  //   let idfk = this.props.location.search
  //   if (idfk === '?reload=true') {
  //     this.setState({
  //       reload: true,
  //     });
  //     console.log("your mum");
  //   }

  //};

  render() {
    // if(this.state.reload){
    //   window.location.reload()
      
    // }
    return (
      <div >
        <Navbar bg="dark" variant="dark" className="navv" sticky="top">
          <Navbar.Brand href="/">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <FontAwesomeIcon icon={faNewspaper} />
          </Navbar.Brand>
          <Nav className="ml-auto">
            { this.state.loggedIn
            ? <UserPopover/>
            : <Nav.Link href='/login'>Log In</Nav.Link>
          }
          </Nav>
        </Navbar>
        {/* <Profile/> */}

        <div className="content">
          <Route path="/feedlist" exact component={FeedList} />
          <Route path="/feedlist/add" exact component={AddFeed} />
          <Route path="/" exact component={ArticleList} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/update" exact component={Profile}/>

        </div>
      </div>
    );
  }
}
export default MenuBar;
