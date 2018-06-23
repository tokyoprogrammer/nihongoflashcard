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
      counter: 0,
      progressUntil: []
    };

    this.countData = this.countData.bind(this);
    this.N5FromApiAsync(this.state.selectedLevel);
  }

  pushPage(wordList, from, to, selectedIndex) {
    let sliced = wordList.slice(from, to);
    localStorage.setItem("selectedIndex", selectedIndex);
    localStorage.setItem("words", JSON.stringify(sliced));
    this.props.navigator.pushPage({component: ThirdPage});
  }

  popPage() {
    localStorage.setItem("jumpToSecond", 0);
    this.props.navigator.popPage();
  }

  countData() {
    let buttonNum = (this.state.wordList.length / 10);
    this.setState({counter: buttonNum});
    let progressUntil = localStorage.getItem("progress" + this.state.selectedLevel);
    if(progressUntil == null) {
      /* If it is first time so if there is no data, 
       * Create new array and initialize it with 0s */
      let size = Math.round(buttonNum); 
      progressUntil = new Array(size).map(function (x, i) { return 0; });
      /* And store array into localStorage */
      localStorage.setItem("progress" + this.state.selectedLevel, JSON.stringify(progressUntil));
    } else {
      /* Else, load data. It represents score of each class. 
       * Index of array means each class id. */
      progressUntil = JSON.parse(progressUntil);
    }
    this.setState({progressUntil: progressUntil});
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
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className="left"><BackButton onClick={this.popPage.bind(this)}>Back</BackButton></div>
        <div className="center">Select Class</div>
      </Toolbar>
    );
  }
  
  render() {
    let wordList = [];
    let imagepath = 'img/N' + this.state.selectedLevel + '.png';
    let cnt = this.state.counter;
    let rows = [];
    let buttonStyleRed = {
      width : '60px',
      margin: '1%',
      backgroundColor: '#FF4500'
    };
    let buttonStyleYellow = {
      width : '60px',
      margin: '1%',
      backgroundColor: '#FFD700'
    };
    let buttonStyleGreen = {
      width : '60px',
      margin: '1%',
      backgroundColor: '#228B22'
    };
    let buttonStyleNormal = {
      width : '60px',
      margin: '1%'
    };

    let iconSize = {
      default : 30,
      material: 28
    };

    let buttons = [];
    /* draw buttons */
    for (let i = 0; i < cnt; i++) {
      let start = i * 10;
      let end = start + 10;
      let progress = this.state.progressUntil[i];
      let buttonStyle = buttonStyleNormal;
      if(progress >= 100) {
        buttonStyle = buttonStyleGreen;
      } else if(progress >= 80) {
        buttonStyle = buttonStyleYellow;
      } else if(progress == null || progress == 0) {
        buttonStyle = buttonStyleNormal;
      } else {
        buttonStyle = buttonStyleRed;
      }

      buttons.push(
        <Button style={buttonStyle} 
          onClick={this.pushPage.bind(this, this.state.wordList, start, end, i)}>{i + 1}
        </Button>);
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
