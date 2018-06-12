import React from 'react';
import ReactDOM from 'react-dom';
import {Toolbar, Page, Button, BackButton, Icon, Carousel, CarouselItem, List, ListItem, Radio} from 'react-onsenui';

import FifthPage from './FifthPage';

export default class ForthPage extends React.Component {
  constructor(props) {
    super(props);

    let wordList = JSON.parse(localStorage.getItem("words"));
    let numOfExamples = 5;
    let preparedArray = [];

    /* make current question list */
    for(let i = 0; i < wordList.length; i++) {
      /* first, select quesion type. 0) kanji type, 1) meaning type */
      let type = this.getRandomInt(2);

      if(type == 0) {
        /* we are going to make kanji type question */
        let answerNum = this.getRandomInt(5);
        let word = wordList[i];
        let question = word.word;
        let exampleList = [];
        /* make example list */
        for(let j = 0; j < numOfExamples; j++) {
          if(j == answerNum) {
            exampleList.push("(" + word.yomigana + ") " + word.meaning);
          }
          else {
            var meaningRand = {};
            let yomiganaRand = wordList[this.getRandomInt(wordList.length)];
            /* make random number for meaning example */
            for(;;) {
              let randNum = this.getRandomInt(wordList.length);
              if(randNum == i) {
                continue; 
              }
              meaningRand = wordList[randNum];
              break;
            }

            exampleList.push("(" + yomiganaRand.yomigana + ") " + meaningRand.meaning);
          }
        }
        let questionToAdd = {
          answerNum: answerNum,
          question: question,
          exampleList: exampleList,
          selectedVal: 0
        };
        preparedArray.push(questionToAdd);
      }
      else {
        /* we are going to make meaing type question */
        let answerNum = this.getRandomInt(5);
        let word = wordList[i];
        let question = word.meaning;
        let exampleList = [];
        /* make example list */
        for(let j = 0; j < numOfExamples; j++) {
          if(j == answerNum) {
            exampleList.push("(" + word.yomigana +") " + word.word);
          }
          else {
            var wordRand = {};
            let yomiganaRand = wordList[this.getRandomInt(wordList.length)];
            /* make random number for meaning example */
            for(;;) {
              let randNum = this.getRandomInt(wordList.length);
              if(randNum == i) {
                continue; 
              }
              wordRand = wordList[randNum];
              break;
            }

            exampleList.push("(" + yomiganaRand.yomigana + ") " + wordRand.word);
          }
        }
        let questionToAdd = {
          answerNum: answerNum,
          question: question,
          exampleList: exampleList,
          selectedVal: 0
        };
        preparedArray.push(questionToAdd);
      }
    }

    this.state = {
      counter: 0,
      questionList: preparedArray
    };
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  pushPage() {
    localStorage.setItem("dontKnowWords", {});
    this.props.navigator.pushPage({component: FifthPage});
  }

  popPage() {
    this.props.navigator.popPage();
  }

  goBack() {
    this.setState({counter: this.state.counter - 1});
  }

  goNext() {
    this.setState({counter: this.state.counter + 1});
  }

  setIndex(index) {
    this.setState({counter: index});
  }

  handleChange(e) {
    this.setIndex(e.activeIndex);
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className="left"><BackButton>Back</BackButton></div>
        <div className="center">Test page</div>
      </Toolbar>
    );
  }

  handleRadioChange(row, index) {
    console.log(index);
    let questionList = this.state.questionList;
    let question = questionList[this.state.counter];
    questionList[this.state.counter] = {
      answerNum: question.answerNum,
      question: question.question,
      exampleList: question.exampleList,
      selectedVal: index
    };
    this.setState({questionList: questionList});
  }

  renderRadioRow(row, index) {
    return (
      <ListItem tappable>
      <label className='left'>
        <Radio
          inputId={`radio-${index}-${row}`}
          checked={index === this.state.questionList[this.state.counter].selectedVal}
          onChange={this.handleRadioChange.bind(this, row, index)}
          />
          </label>
          <label htmlFor={`radio-${index}-${row}`} className='center'>
          {row}
          </label>
      </ListItem>
        )
  }

  render() {
    var nextPageButton = this.state.counter >= this.state.questionList.length - 1 ? 
      (<Button onClick={this.pushPage.bind(this)} style={{margin: '6px'}}>Test Done</Button>) :
      null;
    var carouselCursor = (<div style={{
          textAlign: 'center',
          fontSize: '20px',
          position: 'absolute',
          bottom: '5%',
          left: '0px',
          right: '0px'
        }}>
          {this.state.questionList.map((item, index) => (
            <span key={index} style={{cursor: 'pointer'}} onClick={this.setIndex.bind(this, index)}>
              {this.state.counter === index ? '\u25CF' : '\u25CB'}
            </span>
          ))}
        </div>);
    var buttonStyle = {
      width: '40px'
    };

    var iconSize = {
      default: 30,
      material: 28
    };

    var backButton = this.state.counter > 0 ? 
      (<Button modifier='quiet' onClick={this.goBack.bind(this)} style={buttonStyle}>
         <Icon icon='md-chevron-left' size={iconSize} />
       </Button>) : 
      (<Button modifier='quiet' disabled='true' onClick={this.goBack.bind(this)} style={buttonStyle}>
         <Icon icon='md-chevron-left' size={iconSize} />
       </Button>);

    var nextButton = this.state.counter < this.state.questionList.length - 1 ?
      (<Button modifier='quiet' onClick={this.goNext.bind(this)} style={buttonStyle}>
         <Icon icon='md-chevron-right' size={iconSize} />
       </Button>) : 
      (<Button modifier='quiet' disabled='true' onClick={this.goNext.bind(this)} style={buttonStyle}>
         <Icon icon='md-chevron-right' size={iconSize} />
       </Button>);

    return (
      <Page renderToolbar={this.renderToolbar}>
        <Carousel onPostChange={this.handleChange.bind(this)} style={{height: '90%'}} 
          index={this.state.counter} swipeable autoScroll overscrollable>
          {this.state.questionList.map((item, index) => (
            <CarouselItem key={index}>
              <div style={{textAlign: 'center', marginTop: '30%'}}>
                <h3>Choose correct combination</h3>
                <h1>[ {item.question} ]</h1>
                <List dataSource = {item.exampleList}
                  renderRow={this.renderRadioRow.bind(this)} />
                {nextPageButton}
              </div>
              <div style={{
                position: 'absolute',
                left: '10px',
                bottom: '75%'}}>
                {backButton}
              </div>
              <div style={{
                position: 'absolute',
                right: '10px',
                bottom: '75%'}}>
                {nextButton}
              </div>

            </CarouselItem>
          ))}
        </Carousel>
        {carouselCursor}    
      </Page>
    );
  }
}
