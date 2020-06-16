import React, {Component} from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import {ListGroup, Container, Media, Spinner, Badge} from 'react-bootstrap'
import Axios from 'axios'
import moment from 'moment'
import './stylesheet.css';

class MostViewed extends Component {
  constructor(){
    super();
    this.state = {
      results: [],
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

  getSection(item){
    if(item.subsection){
      return "(" + item.section + " - " + item.subsection + ")"
    }
    if(item.section){
      return "(" + item.section + ")"
    }
  }

  time(timestamp){
    return moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')
  }

  fromNow(timestamp){
    return moment(timestamp).fromNow()
  }

  getUserUrl(userId){
    if(userId){
      // console.log(url)
      var pathArray = userId.split( ' ' );
      return "https://www.nytimes.com/by/" + pathArray[1].toLowerCase() + "-" + pathArray[2].toLowerCase()
    }else{
      return ""
    }
  }

  getImageUrl(media){
    if(media[0]){
      // console.log(media[0]["media-metadata"][0].url)
      return media[0]["media-metadata"][0].url
    }else{
      return "https://static01.nyt.com/vi-assets/images/share/1200x900_t.png"
    }
  }

  componentDidMount(){
    var base = "https://api.nytimes.com/svc/mostpopular/v2/" + this.props.type + "/1.json"
    console.log(this.props.type)
    // }else{
    //   base = "https://api.nytimes.com/svc/mostpopular/v2/" + this.props.type + "/1/facebook.json"
    // }
    const key = "?api-key=fpYY7T905GANr8rLe4LeKmTbjcPwlr6J"
    Axios.get(base+key)
    .then(async(res) => {
      this.setState({
        results: res.data.results,
        isLoad: true
      })
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
              {this.state.results.map((item, item_key) =>
              <ListGroup.Item key={item_key}>
                <Media>
                  <img
                    width={150}
                    className="mr-3"
                    src={this.getImageUrl(item.media)}
                    alt="Generic placeholder"
                  />
                  <Media.Body>
                    <span className="title">
                      <a  className="blackLink" href={item.url} rel="noopener noreferrer" target="_blank">{item.title}</a>
                    </span>
                    <span className="subtitle">
                      {" "}{this.getSection(item)}
                    </span><br/>

                    <span className="subtitle">
                      <time title={this.time(item.published_date)}>{this.fromNow(item.published_date)}</time>{" "}
                      <Badge variant="dark">
                        <a className="whiteLink" href={this.getUserUrl(item.byline)} rel="noopener noreferrer" target="_blank">{item.byline}</a>
                      </Badge>
                    </span><br/>
                    <span>{item.abstract}</span>
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

export default MostViewed