import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'

class Error extends Component {
  render() {
    return (
      <div>
        <Header />
          <h1>Error 404 Not Found</h1>
        <Footer />
      </div>
    )
  }
}

export default Error