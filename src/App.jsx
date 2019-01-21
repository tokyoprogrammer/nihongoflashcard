import React from 'react';
import ReactDOM from 'react-dom';
import {Navigator} from 'react-onsenui';

import MainPage from './MainPage';
import SecondPage from './SecondPage';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    let jumpToSecond = localStorage.getItem("jumpToSecond");
    if(jumpToSecond == null) {
      localStorage.setItem("jumpToSecond", "0");
      jumpToSecond = "0";
    }
    this.state = {
      jumpToSecond : jumpToSecond
    };

  }

  renderPage(route, navigator) {
    const props = route.props || {};
    props.navigator = navigator;

    return React.createElement(route.component, props);
  }

  render() {
    if(this.state.jumpToSecond == '0' || this.state.jumpToSecond == null) {
      return (
        <Navigator initialRoute={{component: MainPage}} renderPage={this.renderPage} />
      );
    } else {
       return (
        <Navigator initialRouteStack={[{component: MainPage}, {component: SecondPage}]} renderPage={this.renderPage} />
      );
    }
  }
}
