import React from "react";
import Users from "./Users";
import { LogOut } from "./LogIn.js";
import { Popover, OverlayTrigger, Nav, Image, Button } from "react-bootstrap";

const users = new Users();

class UserPopover extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: " ",
      email: " ",
      image: "",
    };
    this.fetchData = this.fetchData.bind(this);
  }
  // this.popover = this.popover.bind(this)
  //this.popoverClickRootClose = this.popoverClickRootClose.bind

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    let self = this;
    users.getUser().then(function (result) {
      //console.log(result.profile.follows_business);
      self.setState({
        username: result.user.username,
        image: `https://eu.ui-avatars.com/api/?name=${result.user.username}&rounded=true&length=1&size=48`,
      });
    });
  };

  getImage = () => {};

  render() {
    console.log(this.state.image);
    const popoverFocus = (
      <Popover
        id="popover-trigger-click-root-close"
        title="Popover bottom"
        className="mr-4"
      >
        <Popover.Title className="text-center" as="h3">
          {this.state.username}
        </Popover.Title>
        <Popover.Content>
          <Button variant="outline-primary" href="/update" block>
            Edit Categories
          </Button>
          <LogOut />
        </Popover.Content>
      </Popover>
    );

    return (
      <OverlayTrigger
        trigger="click"
        rootClose
        placement="bottom"
        overlay={popoverFocus}
      >
        <Nav.Link>
          <Image src={this.state.image} roundedCircle className="idfk" />
        </Nav.Link>
      </OverlayTrigger>
    );
  }
}
export default UserPopover;
