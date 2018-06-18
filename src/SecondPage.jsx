import React from 'react';
import ReactDOM from 'react-dom';
import {Toolbar, Page, Button, BackButton} from 'react-onsenui';

import ThirdPage from './ThirdPage';
import App from './App';

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
    console.log(sliced);
    localStorage.setItem("words", JSON.stringify(sliced));
    this.props.navigator.pushPage({component: ThirdPage});
  }

  popPage() {
    /* The reason of resetPage is when the second page has been loaded by Fifth page, 
     * props.navigator will not have a item in a stack to pop out.
     * Which means that we cannot call popPage properly because the stack does not contains items to pop. 
     * But actually popPage of this page is quite deterministic 
     * as the second page does not need a stack to go back to the first page (main page) */
    this.props.navigator.resetPage({component: App});
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
        <div className="left"><BackButton onClick={this.popPage.bind(this)}>Back</BackButton></div>
        <div className="center">Second Page</div>
      </Toolbar>
    );
  }

  render() {
     var wordList = [];
     var imagepath = 'img/N' + this.state.selectedLevel + '.png';
     return (
      <Page renderToolbar={this.renderToolbar.bind(this)}>
        <div style={{textAlign: 'center'}}>
	  <img src={imagepath} style={{width: '90%'}}/>	
	</div>
        <p style={{textAlign: 'center'}}>
          <Button onClick={this.pushPage.bind(this, this.state.wordList, 0, 10)}>Push page</Button>
          <Button onClick={this.popPage.bind(this)}>Pop page</Button>
        </p>
      </Page>
    );
  }
}
