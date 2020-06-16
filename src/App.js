import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MostViewed from './Components/MostViewed'
import Search from './Components/Search'
import Error from './Components/Error'
import About from './Components/About'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Search} />
            <Route path="/MostViewed" render={({match})=><MostViewed type={"viewed"} match={match}/>}/>
            <Route path="/MostEmailed" render={({match})=><MostViewed type={"emailed"} match={match}/>}/>
            <Route path="/MostShared" render={({match})=><MostViewed type={"shared"} match={match}/>}/>
            <Route path="/about" component={About} />
            <Route component={Error} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
