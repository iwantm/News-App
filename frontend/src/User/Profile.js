import React from "react";
import Users from "./Users";
import { Form, Button } from "react-bootstrap";

const users = new Users();

class Profile extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      token: localStorage.getItem("token"),
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
    this.fetchData = this.fetchData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.popover = this.popover.bind(this)
    //this.popoverClickRootClose = this.popoverClickRootClose.bind
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    let self = this;
    users.getUser().then(function (result) {
      //console.log(result.profile.follows_business);
      self.setState({
        follows_entertainment: result.profile.follows_entertainment,
        follows_business: result.profile.follows_business,
        follows_crime: result.profile.follows_crime,
        follows_culture: result.profile.follows_culture,
        follows_education: result.profile.follows_education,
        follows_environment: result.profile.follows_environment,
        follows_fooddrink: result.profile.follows_fooddrink,
        follows_honeliving: result.profile.follows_honeliving,
        follows_parenting: result.profile.follows_parenting,
        follows_politics: result.profile.follows_politics,
        follows_religion: result.profile.follows_religion,
        follows_sciencetech: result.profile.follows_sciencetech,
        follows_sport: result.profile.follows_sport,
        follows_style: result.profile.follows_style,
        follows_travel: result.profile.follows_travel,
        follows_weddings: result.profile.follows_weddings,
      });
    });
  };

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

  handleSubmit(event) {
    this.handleRegister();
    event.preventDefault();
    //this.setState({navigate: true})
  }

  handleRegister() {
    users
      .updateUser({
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
      })
      .then((result) => {
        this.props.history.push("/?reload=true");
      })
      .catch(() => {
        alert("big error");
      });
  }

  render() {
    console.log(this.state);
    return (
      <form className="formy container-fluid mt-2">
        <Form onSubmit={this.handleSubmit} className="idk">
          <Form.Group className="form-width">
            <Form.Group className="form-column">
              <Form.Check
                checked={this.state.follows_entertainment}
                name="follows_entertainment"
                label="Entertainment"
                onChange={this.handleChange}
              />
              <Form.Check
                checked={this.state.follows_business}
                name="follows_business"
                label="Business"
                onChange={this.handleChange}
              />
              <Form.Check
                checked={this.state.follows_crime}
                name="follows_crime"
                label="Crime"
                onChange={this.handleChange}
              />
              <Form.Check
                checked={this.state.follows_culture}
                name="follows_culture"
                label="Culture"
                onChange={this.handleChange}
              />

              <Form.Check
                checked={this.state.follows_education}
                name="follows_education"
                label="Education"
                onChange={this.handleChange}
              />
              <Form.Check
                checked={this.state.follows_environment}
                name="follows_environment"
                label="Environment"
                onChange={this.handleChange}
              />
              <Form.Check
                checked={this.state.follows_fooddrink}
                name="follows_fooddrink"
                label="Food"
                onChange={this.handleChange}
              />
              <Form.Check
                checked={this.state.follows_honeliving}
                name="follows_honeliving"
                label="Home"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group className="form-column">
              <Form.Check
                checked={this.state.follows_parenting}
                name="follows_parenting"
                label="Parenting"
                onChange={this.handleChange}
              />
              <Form.Check
                checked={this.state.follows_politics}
                name="follows_politics"
                label="Politics"
                onChange={this.handleChange}
              />
              <Form.Check
                checked={this.state.follows_religion}
                name="follows_religion"
                label="Religion"
                onChange={this.handleChange}
              />
              <Form.Check
                checked={this.state.follows_sciencetech}
                name="follows_sciencetech"
                label="Science"
                onChange={this.handleChange}
              />

              <Form.Check
                checked={this.state.follows_sport}
                name="follows_sport"
                label="Sport"
                onChange={this.handleChange}
              />
              <Form.Check
                checked={this.state.follows_style}
                name="follows_style"
                label="Style"
                onChange={this.handleChange}
              />
              <Form.Check
                checked={this.state.follows_travel}
                name="follows_travel"
                label="Travel"
                onChange={this.handleChange}
              />
              <Form.Check
                checked={this.state.follows_weddings}
                name="follows_weddings"
                label="Weddings"
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form.Group>
          <Button variant="outline-primary" type="submit" block>
            Submit
          </Button>
        </Form>
      </form>
    );
  }
}

export default Profile;
