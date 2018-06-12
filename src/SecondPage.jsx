import React from 'react';
import ReactDOM from 'react-dom';
import {Toolbar, Page, Button, BackButton} from 'react-onsenui';

import ThirdPage from './ThirdPage';

export default class SecondPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wordList: [],
      selectedLevel: localStorage.getItem("selectedLevel")
    };
    this.N5FromApiAsync(this.state.selectedLevel);
  }

  pushPage(wordList, from, to) {
    let sliced = wordList.slice(from, to);
    localStorage.setItem("words", JSON.stringify(sliced));
    this.props.navigator.pushPage({component: ThirdPage});
  }

  popPage() {
    this.props.navigator.popPage();
  }

  N5FromApiAsync(level) {
    return fetch('json/N' + level + '.json')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({wordList: responseJson});
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className="left"><BackButton>Back</BackButton></div>
        <div className="center">Second Page</div>
      </Toolbar>
    );
  }

  render() {
     var wordList = [];
     var imagepath = 'img/N' + this.state.selectedLevel + '.png';
     return (
      <Page renderToolbar={this.renderToolbar}>
        <div style={{textAlign: 'center'}}>
	  <img src={imagepath} style={{width: '90%'}}/>	
	</div>
        <p style={{textAlign: 'center'}}>
          <Button onClick={this.pushPage.bind(this, this.state.wordList, 0, 9)}>Push page</Button>
          <Button onClick={this.popPage.bind(this)}>Pop page</Button>
        </p>
      </Page>
    );
  }
}
