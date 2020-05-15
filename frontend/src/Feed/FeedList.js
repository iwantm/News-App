import React, { Component } from "react";


import Feeds from "./Feeds";

const isk = new Feeds();

class FeedList extends Component {
  constructor(props) {
    super(props);
    //  console.log(this.props)
    this.state = {
      feeds: [],
    };
  }

  componentDidMount() {
    let self = this;
    isk.getFeeds().then(function (result) {
      console.log(result);
      //console.log(self.feeds)
      self.setState({
        feeds: Object.values(result)[0],
      });
    });
    console.log(this.feeds);
  }

  render() {
    console.log(this.state.feeds[0]);
    return (
      <div className="feeds--list">
        <table className="table">
          <thead key="thead">
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            {this.state.feeds.map((c) => (
              <tr key={c.id}>
                <td>{c.id} </td>
                <td>{c.title} </td>
                <td>{c.url}</td>
              </tr>
            ))}
          </tbody>
        </table>


      </div>
    );
  }
}
export default FeedList;
