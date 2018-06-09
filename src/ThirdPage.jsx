import React from 'react';
import ReactDOM from 'react-dom';
import {Toolbar, Page, Button, BackButton} from 'react-onsenui';

import FourthPage from './FourthPage';

export default class ThirdPage extends React.Component {
  pushPage() {
    this.props.navigator.pushPage({component: FourthPage});
  }

  popPage() {
    this.props.navigator.popPage();
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className="left"><BackButton>Back</BackButton></div>
        <div className="center">Third page</div>
      </Toolbar>
    );
  }

  render() {
     console.log(localStorage.getItem("words"));
     return (
      <Page renderToolbar={this.renderToolbar}>
        <p style={{textAlign: 'center'}}>
          <Button onClick={this.pushPage.bind(this)}>Push page</Button>
          <Button onClick={this.popPage.bind(this)}>Pop page</Button>
        </p>
      </Page>
    );
  }
}
