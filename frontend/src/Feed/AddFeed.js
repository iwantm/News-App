import React, { Component} from "react";

import Feeds from "./Feeds";

const feeds = new Feeds();


class AddFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Title: "",
      Url: "",
    };
    console.log(this.state.title);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(event) {
    this.setState({ Title: event.target.value });
  }

  handleUrlChange(event) {
    this.setState({ Url: event.target.value });
  }

  handleCreate() {
    feeds
      .addFeed({
        title: this.state.Title,
        url: this.state.Url,
      })
      .then((result) => {
        alert("Added Feed!");
        console.log(result)
      })
      .catch(() => {
        alert("There was an error! Please re-check your form.");
      });
  }

  handleSubmit(event) {
    this.handleCreate();
    console.log(this.title);

    event.preventDefault();
    this.props.history.push('');

  }

  render() {
    console.log(this.state.Title);
    console.log(this.state.Url);

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            className="form-control"
            type="text"
            value={this.state.Title}
            onChange={this.handleTitleChange}
          />
          <label>Url:</label>
          <input
            className="form-control"
            type="text"
            value={this.state.Url}
            onChange={this.handleUrlChange}
          />
          <input className="btn btn-primary" type="submit" value="Submit" />
        </div>
      </form>
    );
  }
}

export default AddFeed;
