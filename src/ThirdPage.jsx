import React from 'react';
import ReactDOM from 'react-dom';
import {Toolbar, Page, Button, BackButton, Icon, Carousel, CarouselItem} from 'react-onsenui';

import FourthPage from './FourthPage';

export default class ThirdPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wordList: JSON.parse(localStorage.getItem("words")),
      counter: 0,
      bgColor: [
        '#F1948A',
        '#D7BDE2',
        '#85C1E9',
        '#73C6B6',
      ]
    };
  }

  pushPage() {
    localStorage.setItem("words", JSON.stringify(this.state.wordList));
    this.props.navigator.pushPage({component: FourthPage});
  }

  popPage() {
    this.props.navigator.popPage();
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className="left"><BackButton>Back</BackButton></div>
        <div className="center">Study page</div>
      </Toolbar>
    );
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

  render() {
    var testButton = this.state.counter >= this.state.wordList.length - 1 ? 
      (<Button onClick={this.pushPage.bind(this)}>Go Test</Button>) :
      null;
    var carouselCursor = (<div style={{
          textAlign: 'center',
          fontSize: '20px',
          position: 'absolute',
          bottom: '5%',
          left: '0px',
          right: '0px'
        }}>
          {this.state.wordList.map((item, index) => (
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

    var nextButton = this.state.counter < this.state.wordList.length - 1 ?
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
          {this.state.wordList.map((item, index) => (
            <CarouselItem key={index} style={{backgroundColor: this.state.bgColor[index % 4]}}>
              <div style={{textAlign: 'center', marginTop: '50%'}}>
                <h3>{item.yomigana}</h3>
                <h1>{item.word}</h1>
                <h2>{item.meaning}</h2>
                {testButton}
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
