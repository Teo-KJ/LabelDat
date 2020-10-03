import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import Layoutz from './layoutz'
import { BrowserRouter, Route } from 'react-router-dom';

class Dashboard extends React.Component {

  render() {
    return (
      <BrowserRouter>
      <Route path = "/labellerdashboard" component = {Layoutz}>
      </Route>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<Dashboard />, document.getElementById('container'));