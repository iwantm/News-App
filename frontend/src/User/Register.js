import React, { Component } from "react";
import Users from "./Users";
import { Form, Button } from "react-bootstrap";

const users = new Users();

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      follows_entertainment: false,
      follows_business: false,
      follows_crime: false,
      follows_culture: false,
      follows_education: false,
      follows_environment: false,
      follows_fooddrink: false,
      follows_honeliving: false,
      follows_parenting: false,
      follows_politics: false,
      follows_religion: false,
      follows_sciencetech: false,
      follows_sport: false,
      follows_style: false,
      follows_travel: false,
      follows_weddings: false,
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleRegister() {
    users
      .registerUser({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        profile: {
          follows_entertainment: this.state.follows_entertainment,
          follows_business: this.state.follows_business,
          follows_crime: this.state.follows_crime,
          follows_culture: this.state.follows_culture,
          follows_education: this.state.follows_education,
          follows_environment: this.state.follows_environment,
          follows_fooddrink: this.state.follows_fooddrink,
          follows_honeliving: this.state.follows_honeliving,
          follows_parenting: this.state.follows_parenting,
          follows_politics: this.state.follows_politics,
          follows_religion: this.state.follows_religion,
          follows_sciencetech: this.state.follows_sciencetech,
          follows_sport: this.state.follows_sport,
          follows_style: this.state.follows_style,
          follows_travel: this.state.follows_travel,
          follows_weddings: this.state.follows_weddings,
        },
      })
      .then((result) => {
        console.log(result);
        // localStorage.setItem("token", result.data.token);
        // localStorage.setItem("user", result.data.user.username);
        // console.log(localStorage.getItem("user"));
        // console.log(localStorage.getItem("token"));
        // this.props.history.push("/?reload=true");
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("user", result.data.user.username);
        this.props.history.push("/?reload=true");
      })
      .catch(() => {
        alert("big f");
      });
  }

  handleSubmit(event) {
    this.handleRegister();
    event.preventDefault();
    //this.setState({navigate: true})
  }

  handleChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    //  console.log(isChecked)
    if (isChecked) {
      this.setState({ [item]: true });
    } else {
      this.setState({ [item]: false });
    }
  }

  handleTextChange(e) {
    const item = e.target.name;
    this.setState({ [item]: e.target.value });
  }

  render() {
    //  console.log(this.state.follows_entertainment);
    // console.log(this.state.follows_business);
    // console.log(this.state.follows_crime);
    // console.log(this.state.follows_culture);
    // console.log(this.state.username)
    // console.log(this.state.email)
    // console.log(this.state.password)

    return (
      <form onSubmit={this.handleSubmit} className="formy mt-2">
        <Form.Group  className="idk">
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="username"
              name="username"
              onChange={this.handleTextChange}
              value={this.state.username}
            />
            <Form.Label className="mt-2">Email address:</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              name="email"
              onChange={this.handleTextChange}
              value={this.state.email}
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
          <Form.Group className="form-row">
            <Form.Group className="form-column">
              <Form.Check
                name="follows_entertainment"
                label="Entertainment"
                onChange={this.handleChange}
              />
              <Form.Check
                name="follows_business"
                label="Business"
                onChange={this.handleChange}
              />
              <Form.Check
                name="follows_crime"
                label="Crime"
                onChange={this.handleChange}
              />
              <Form.Check
                name="follows_culture"
                label="Culture"
                onChange={this.handleChange}
              />

              <Form.Check
                name="follows_education"
                label="Education"
                onChange={this.handleChange}
              />
              <Form.Check
                name="follows_environment"
                label="Environment"
                onChange={this.handleChange}
              />
              <Form.Check
                name="follows_fooddrink"
                label="Food"
                onChange={this.handleChange}
              />
              <Form.Check
                name="follows_honeliving"
                label="Home"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group className="form-column">
              <Form.Check
                name="follows_parenting"
                label="Parenting"
                onChange={this.handleChange}
              />
              <Form.Check
                name="follows_politics"
                label="Politics"
                onChange={this.handleChange}
              />
              <Form.Check
                name="follows_religion"
                label="Religion"
                onChange={this.handleChange}
              />
              <Form.Check
                name="follows_sciencetech"
                label="Science"
                onChange={this.handleChange}
              />

              <Form.Check
                name="follows_sport"
                label="Sport"
                onChange={this.handleChange}
              />
              <Form.Check
                name="follows_style"
                label="Style"
                onChange={this.handleChange}
              />
              <Form.Check
                name="follows_travel"
                label="Travel"
                onChange={this.handleChange}
              />
              <Form.Check
                name="follows_weddings"
                label="Weddings"
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form.Group>
          <Button variant="outline-primary" type="submit" block>
            Submit
          </Button>
        </Form.Group>
      </form>
    );
  }
}
export default Register;
