import React, {Component} from 'react'
import Header from './Header'
import Footer from './Footer'
import {ListGroup, Container, Media, Spinner, Badge} from 'react-bootstrap'
import Axios from 'axios'
import moment from 'moment'
import './stylesheet.css';

class Search extends Component {
  constructor(){
    super();
    this.state = {
      docs: [],
      isLoad: false,
    }
  }

  getStory(i){
    // console.log(i)
    const base = "https://hacker-news.firebaseio.com/v0/item/"+i+".json"
    Axios.get(base)
    .then(res => {
      // console.log(res.data)
      this.setState({
        items: [...this.state.items, res.data],
        isLoad: true
      })
      // console.log(this.state.items)
    })
    .catch(err => {
      console.log(err);
    })
  }

  shortUrl(url){
    if(url){
      // console.log(url)
      var pathArray = url.split( '/' );
      var host = pathArray[2];
      return "("+host+")"
    }
  }

  time(timestamp){
    return moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')
    // return moment(timestamp*1000).startOf('hour').fromNow()
  }

  fromNow(timestamp){
    return moment(timestamp).fromNow()
    // return moment(timestamp*1000).startOf('hour').fromNow()
  }

  getUserUrl(userId){
    if(userId.person){
      return "https://www.nytimes.com/by/" + userId.person[0].firstname.toLowerCase() + "-" + userId.person[0].lastname.toLowerCase()
    }
  }

  getImageUrl(imageUrl){
    if(imageUrl[0]){
      console.log(imageUrl[0].url)
      return "https://static01.nyt.com/" + imageUrl[0].url
    }else{
      return "https://static01.nyt.com/vi-assets/images/share/1200x900_t.png"
    }
  }

  componentDidMount(){
    const base = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election"
    const key = "&api-key=fpYY7T905GANr8rLe4LeKmTbjcPwlr6J"
    Axios.get(base+key)
    .then(async(res) => {
      this.setState({
        docs: res.data.response.docs,
        isLoad: true
      })
      console.log(this.state.docs)
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <div>
        <Header/>
          <Container className="my-5">
            {!this.state.isLoad &&
            <span className="loading my-5">
              <Spinner animation="grow" /> {" "}
              <Spinner animation="grow" /> {" "}
              <Spinner animation="grow" /> {" "}
              <Spinner animation="grow" /> {" "}
              <Spinner animation="grow" />
            </span>}

            {this.state.isLoad &&
            <ListGroup variant="flush">
              {this.state.docs.map((item, item_key) =>
              <ListGroup.Item key={item_key}>
                <Media>
                  <img
                    width={150}
                    className="mr-3"
                    src={this.getImageUrl(item.multimedia)}
                    alt="Generic placeholder"
                  />
                  <Media.Body>
                    <span className="title">
                      <a  className="blackLink" href={item.web_url} rel="noopener noreferrer" target="_blank">{item.abstract}</a>
                    </span> {" "}
                    <span className="subtitle">
                      {this.shortUrl(item.url)}
                    </span>
                    <span className="subtitle">
                      <time title={this.time(item.pub_date)}>{this.fromNow(item.pub_date)}</time>{" "}
                      <Badge variant="dark">
                        <a className="whiteLink" href={this.getUserUrl(item.byline)} rel="noopener noreferrer" target="_blank">{item.byline.original}</a>
                      </Badge>
                    </span><br/>
                    <span>{item.lead_paragraph}</span>
                  </Media.Body>
                </Media>
              </ListGroup.Item>
              )}
            </ListGroup>}
        </Container>
        <Footer/>
      </div>
    )
  }
}

export default Search