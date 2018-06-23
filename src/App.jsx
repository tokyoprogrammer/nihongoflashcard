import React from 'react';
import ReactDOM from 'react-dom';
import {Navigator} from 'react-onsenui';

import MainPage from './MainPage';
import SecondPage from './SecondPage';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    console.log("called");
    this.state = {
      jumpToSecond : localStorage.getItem("jumpToSecond")
    };

  }

  renderPage(route, navigator) {
    const props = route.props || {};
    props.navigator = navigator;

    return React.createElement(route.component, props);
  }

  render() {
    if(this.state.jumpToSecond == '0') {
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
