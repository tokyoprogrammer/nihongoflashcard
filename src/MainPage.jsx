import React from 'react';
import ReactDOM from 'react-dom';
import {Toolbar, Page, Button} from 'react-onsenui';

import SecondPage from './SecondPage';

export default class MainPage extends React.Component {
  
  pushPage(level) {
    localStorage.setItem("selectedLevel", level);
    this.props.navigator.pushPage({component: SecondPage});
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className="center">NIHONGO Flash Card</div>
      </Toolbar>
    );
  }

  render() {
    return (
      <Page renderToolbar={this.renderToolbar}>
        <p style={{textAlign: 'center'}}>
          <Button onClick={this.pushPage.bind(this, 5)}>N5</Button>
        </p>
      </Page>
    );
  }
}
