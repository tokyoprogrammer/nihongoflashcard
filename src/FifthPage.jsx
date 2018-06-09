import React from 'react';
import ReactDOM from 'react-dom';
import {Toolbar, Page, Button, BackButton} from 'react-onsenui';

export default class FifthPage extends React.Component {
  popPage() {
    this.props.navigator.popPage();
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className="left"><BackButton>Back</BackButton></div>
        <div className="center">Fifth page</div>
      </Toolbar>
    );
  }

  render() {
     console.log(localStorage.getItem("words"));
     return (
      <Page renderToolbar={this.renderToolbar}>
        <p style={{textAlign: 'center'}}>
          <Button onClick={this.popPage.bind(this)}>Pop page</Button>
        </p>
      </Page>
    );
  }
}
