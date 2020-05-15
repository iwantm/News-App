import React, { Component } from "react";
import Users from "./Users";
import { Form, Button } from "react-bootstrap";

const users = new Users();

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      token: "",
      navigate: false,
    };
    //    console.log(this.state.username);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(e) {
    const item = e.target.name;
    this.setState({ [item]: e.target.value });
  }

  handleLogin() {
    users
      .loginUser({
        username: this.state.username,
        password: this.state.password,
      })
      .then((result) => {
        //console.log(result.data.token)
        //this.setState({token: result.data.token})
        //   console.log(result.data.user.username)
        //console.log(this.state.token)
        // axios.defaults.headers.common['Authorization'] = this.state.token;
        //localStorage.setItem('token', result.data.token);
        //localStorage.removeItem('token');

        localStorage.setItem("token", result.data.token);
        localStorage.setItem("user", result.data.user.username);
        this.props.history.push("/?reload=true");
      })
      .catch(() => {
        alert(this.state.username);
      });
  }

  handleSubmit(event) {
    this.handleLogin();
    event.preventDefault();
    //this.setState({navigate: true})
  }

  render() {
    return (
      <form className="form-width mt-2">
        <Form onSubmit={this.handleSubmit} className="idk">
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="username"
              name="username"
              onChange={this.handleTextChange}
              value={this.state.username}
            />
            <Form.Label className="mt-2">Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="nooo"
              name="password"
              onChange={this.handleTextChange}
              value={this.state.password}
            />
          </Form.Group>
          <Button variant="outline-primary" type="submit" block>
            Submit
          </Button>
          <Button variant="outline-success" href="/register" block>
            Create Account
          </Button>
        </Form>
      </form>
    );
  }
}

export default Login;

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigate: false,
    };
  }

  logout = () => {
    if (localStorage.getItem("token")) {
      localStorage.clear();
    } else {
    }
  };

  render() {
    return (
      <Button variant="outline-danger" block onClick={this.logout} href="/">
        Logout
      </Button>
    );
  }
}
export const LogOut = Logout;
