import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
// import "./styles.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import FetchClient from "../FetchClient";

class FeedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      pageNumber: 1,
      hasMore: true,
      reload: false,
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    //initial request is sent
    this.fetchData();
    this.refreshRequired();
  }

  refreshRequired = () => {
    let reloadRequired = this.props.location.search;
    if (reloadRequired === "?reload=true") {
      this.setState({
        reload: true,
      });
    }
  };

  fetchData = () => {
    let url = `http://192.168.1.253:8000/api/articles/?page=${this.state.pageNumber}`
    FetchClient.get(
      url
    ).then((res) => {
      let data = Object.values(res)[0];
      let newArticles = Object.values(data)[0];
      this.setState({
        articles: [...this.state.articles, ...newArticles],
        pageNumber: this.state.pageNumber + 1,
      });
    });
  };

  render() {
    if (this.state.reload) {
      window.location.replace("/");
    }

    return (
      <div className="App">
        <InfiniteScroll
          dataLength={this.state.articles.length} 
          next={this.fetchData}
          hasMore={this.state.hasMore}
        >
          <Container fluid>
            {this.state.articles.map((c) => (
              <div>
                <Card className="mt-2">
                  <Card.Img variant="top" src={c.image_url} />
                  <Card.Body>
                    <Card.Title>{c.headline}</Card.Title>
                    <Card.Text>
                      {/* {c.description
                        .replace(/(<([^>]+)>)/gi, ".")} */}
                    </Card.Text>
                    <Button
                      variant="outline-primary"
                      block
                      href={c.url}
                      target="_blank"
                    >
                      Read Article
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </Container>
        </InfiniteScroll>
      </div>
    );
  }
}

// \.replace(/^(.{800}[^\.]*)*/, "$1")
export default FeedList;
