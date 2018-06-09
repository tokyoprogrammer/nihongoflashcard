import React from 'react';
import ReactDOM from 'react-dom';
import {Toolbar, Page, Button, BackButton} from 'react-onsenui';

import FifthPage from './FifthPage';

export default class ForthPage extends React.Component {
  pushPage() {
    localStorage.setItem("dontKnowWords", {});
    this.props.navigator.pushPage({component: FifthPage});
  }

  popPage() {
    this.props.navigator.popPage();
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className="left"><BackButton>Back</BackButton></div>
        <div className="center">Fourth page</div>
      </Toolbar>
    );
  }

  render() {
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
