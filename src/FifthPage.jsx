import React from 'react';
import ReactDOM from 'react-dom';
import {Toolbar, Page, Button, BackButton, Icon, Carousel, CarouselItem} from 'react-onsenui';

import SecondPage from './SecondPage'

export default class FifthPage extends React.Component {
  constructor(props) {
    super(props);

    let pageList = [];
    let wordList = JSON.parse(localStorage.getItem("dontKnowWords"));
    let message = wordList.length <= 0 ? "Perfect Score!!" : wordList.length <= 2 ? "Good Job!" : "Not Good..";
    let result = {
      top_: "Examination Result",
      mid_: (10 - wordList.length) + " / 10",
      bottom_: message
    };
   
    pageList.push(result);

    for(let i = 0; i < wordList.length; i++) {
      pageList.push({
        top_: wordList[i].yomigana,
        mid_: wordList[i].word,
        bottom_: wordList[i].meaning
      });
    }

    this.state = {
      pageList: pageList,
      counter: 0
    };
    console.log(pageList);

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

  loadPage() {
    /* reset page will remove all stacks and reset page with component */
    this.props.navigator.resetPage({component: SecondPage});
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
    let toTopButton = this.state.counter >= this.state.pageList.length - 1 ? 
      (<Button onClick={this.loadPage.bind(this)}>Go to the Selection page</Button>) :
      null;

    let carouselCursor = (<div style={{
          textAlign: 'center',
          fontSize: '20px',
          position: 'absolute',
          bottom: '5%',
          left: '0px',
          right: '0px'
        }}>
          {this.state.pageList.map((item, index) => (
            <span key={index} style={{cursor: 'pointer'}} onClick={this.setIndex.bind(this, index)}>
              {this.state.counter === index ? '\u25CF' : '\u25CB'}
            </span>
          ))}
        </div>);
    let buttonStyle = {
      width: '40px'
    };

    let iconSize = {
      default: 30,
      material: 28
    };

    let backButton = this.state.counter > 0 ? 
      (<Button modifier='quiet' onClick={this.goBack.bind(this)} style={buttonStyle}>
         <Icon icon='md-chevron-left' size={iconSize} />
       </Button>) : 
      (<Button modifier='quiet' disabled='true' onClick={this.goBack.bind(this)} style={buttonStyle}>
         <Icon icon='md-chevron-left' size={iconSize} />
       </Button>);

    let nextButton = this.state.counter < this.state.pageList.length - 1 ?
      (<Button modifier='quiet' onClick={this.goNext.bind(this)} style={buttonStyle}>
         <Icon icon='md-chevron-right' size={iconSize} />
       </Button>) : 
      (<Button modifier='quiet' disabled='true' onClick={this.goNext.bind(this)} style={buttonStyle}>
         <Icon icon='md-chevron-right' size={iconSize} />
       </Button>);

     return (
      <Page renderToolbar={this.renderToolbar}>
        <Carousel onPostChange={this.handleChange.bind(this)} style={{height: '70%'}} 
          index={this.state.counter} swipeable autoScroll overscrollable>
          {this.state.pageList.map((item, index) => (
            <CarouselItem key={index}>
              <div style={{textAlign: 'center', marginTop: '50%'}}>
                <h3>{item.top_}</h3>
                <h1>{item.mid_}</h1>
                <h2>{item.bottom_}</h2>
                {toTopButton}
              </div>
              <div style={{
                position: 'absolute',
                left: '10px',
                bottom: '45%'}}>
                {backButton}
              </div>
              <div style={{
                position: 'absolute',
                right: '10px',
                bottom: '45%'}}>
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
