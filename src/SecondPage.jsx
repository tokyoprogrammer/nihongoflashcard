import React from 'react';
import ReactDOM from 'react-dom';
import {Toolbar, Page, Button, BackButton} from 'react-onsenui';

import ThirdPage from './ThirdPage';

export default class SecondPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wordList: [],
      selectedLevel: localStorage.getItem("selectedLevel"),
      counter: 0
    };

    this.countData = this.countData.bind(this);
    this.N5FromApiAsync(this.state.selectedLevel);
    this.handleDecrease = this.handleDecrease.bind(this);
  }

  pushPage(wordList, from, to) {
    let sliced = wordList.slice(from, to);
    console.log(sliced);
    localStorage.setItem("words", JSON.stringify(sliced));
    this.props.navigator.pushPage({component: ThirdPage});
  }

  popPage() {
    console.log(this);
    localStorage.setItem("jumpToSecond", 0);
    this.props.navigator.popPage();
  }

  countData() {
    let buttonNum = (this.state.wordList.length / 10);
    this.setState({counter: buttonNum}); 
    console.log('counter : ' + this.state.counter);
  }

  N5FromApiAsync(level) {
    var this_ = this;
    new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest;
      xhr.onload = function() {
        this_.setState({wordList: JSON.parse(xhr.responseText)});
        this_.countData();

        resolve(new Response(xhr.responseText, {status: xhr.status}));
      }
      xhr.onerror = function() {
        reject(new TypeError('Local request failed'));
      }
      xhr.open('GET', 'json/N' + level + '.json');
      xhr.send(null);
    });
/*
    return fetch('json/N' + level + '.json')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({wordList: responseJson});
      this.countData();
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
*/
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className="left"><BackButton onClick={this.popPage.bind(this)}>Back</BackButton></div>
        <div className="center">Second Page</div>
      </Toolbar>
    );
  }
  
  handleDecrease(){
    this.setState({
      counter: this.state.counter - 1
    });
  }

  render() {
    let wordList = [];
    let imagepath = 'img/N' + this.state.selectedLevel + '.png';
    let cnt = this.state.counter;
    let rows = [];
    let buttonStyle = {
      width : '60px',
      margin: '1%'
    };
    let iconSize = {
      default : 30,
      material: 28
    };

    let buttons = [];
    for (let i = 0; i < cnt; i++) {
      let start = i * 10;
      let end = start + 10;
      buttons.push(<Button style={buttonStyle} onClick={this.pushPage.bind(this, this.state.wordList, start, end)}>{i + 1}</Button>);
    }

    return (
      <Page renderToolbar={this.renderToolbar.bind(this)}>
        <div style={{textAlign: 'center'}}>
          <img src={imagepath} style={{width: '90%'}}/>	
        </div>
        <div style={{textAlign: 'center'}}>{buttons}</div>
      </Page> 
    );
  }
}
