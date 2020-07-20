import React from 'react';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Home } from '../components/Home';
import { About } from '../components/About';
import { Contact } from '../components/Contact';
import { Blogs } from '../components/Blogs';
import { PsychoAssess } from './PsychoAssess';
import { Sign_In_Up } from '../components/Sign_In_Up';
import { NoMatch } from '../components/NoMatch';
import { NavBar } from '../components/NavBar'


function App() {
  return (
    <React.Fragment>
    <NavBar />
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/blogs" component={Blogs} />
            <Route path="/psychoAssess" component={PsychoAssess} />
            <Route path="/sign-in-up" component={Sign_In_Up} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
    </React.Fragment>
  );
}

export default App;














