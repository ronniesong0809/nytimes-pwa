import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MostViewed from './Components/MostViewed'
import MostEmailed from './Components/MostEmailed'
import MostShared from './Components/MostShared'
import Error from './Components/Error'
import About from './Components/About'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" component={MostViewed} />
            <Route path="/MostEmailed" component={MostEmailed} />
            <Route path="/MostShared" component={MostShared} />
            <Route path="/about" component={About} />
            <Route component={Error} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
