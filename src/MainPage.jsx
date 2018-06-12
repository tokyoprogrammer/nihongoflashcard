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
        <img style={{width: '100%'}} src='img/konnichiwa.jpg' />
        <div style={{textAlign: 'center'}}>
          <Button style={{margin: '6px'}} modifier='large' onClick={this.pushPage.bind(this, 5)}>N5</Button>
          <Button style={{margin: '6px'}} modifier='large' onClick={this.pushPage.bind(this, 4)}>N4</Button>
          <Button style={{margin: '6px'}} modifier='large' onClick={this.pushPage.bind(this, 3)}>N3</Button>
          <Button style={{margin: '6px'}} modifier='large' onClick={this.pushPage.bind(this, 2)}>N2</Button>
          <Button style={{margin: '6px'}} modifier='large' onClick={this.pushPage.bind(this, 1)}>N1</Button>
        </div>
      </Page>
    );
  }
}
