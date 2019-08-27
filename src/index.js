import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import 'tachyons';
import './index.css';
import logo from './y18.gif';
import Home from './Home'
import NewStories from './NewStories';
import BestStories from './BestStories';
import Ask from './Ask';
import Show from './Show';
import Jobs from './Jobs';




ReactDOM.render(
  <Router>
    <div class="nav">
      <nav class="">
        <Link to={'/'}><img alt="" class="logo" src={logo} width="18" height="18" /></Link>
        <span> </span>
        <Link to={'/'} target="_blank" class="link dim black b f6 f5-ns dib mr3" href="#" title="Home">Hacker News |</Link>
      <Link to={'/newest'} class="link dim gray    f6 f5-ns dib mr3 color" href="#" title="new">new |</Link>
        <Link to='/best' class="link dim gray    f6 f5-ns dib mr3 color" href="#" title="past">best |</Link>
        <Link to='/ask' class="link dim gray    f6 f5-ns dib color" href="#" title="ask">ask | </Link>
        <Link to='/show' class="link dim gray    f6 f5-ns dib color" href="#" title="show">show |</Link>
        <Link to='/jobs' class="link dim gray    f6 f5-ns dib color" href="#" title="jobs">jobs |</Link>
      </nav>
    </div>
    <Route exact path="/" component={Home} />
    <Route path="/newest" component={NewStories} />
    <Route path="/best" component={BestStories} />
    <Route path="/ask" component={Ask} />
    <Route path="/show" component={Show} />
    <Route path="/jobs" component={Jobs} />

  </Router>
  , document.getElementById('root'));
