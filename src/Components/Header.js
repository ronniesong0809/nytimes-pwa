import React, { Component } from 'react'
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faNewspaper} from '@fortawesome/free-solid-svg-icons'

class Headers extends Component {
  constructor(){
    super();
    this.state = {
      search: ""
    }
  }

  handleSearchInput = event => {
    this.setState({
      search: event.target.value
    });
  };

  render() {
    return (
      <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">
          <FontAwesomeIcon icon={faNewspaper}/>{' '}
          New York Times
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/MostViewed">Most Viewed</Nav.Link>
            <Nav.Link href="/MostShared">Most Shared</Nav.Link>
            <Nav.Link href="/MostEmailed">Most Emailed</Nav.Link>
            <Nav.Link href="/">About</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl
              onChange={this.handleSearchInput}
              type="text"
              placeholder="Search"
              className="mr-sm-2"
            />
            <Button variant="outline-info" href={this.state.search} >Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Headers