import React from 'react';
import './root.css';

export default class Root extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: 'Hello, world.',
      width: 0,
      mouseDown: false,
    }
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.randomIndex = this.randomIndex.bind(this);
    this.tick = this.tick.bind(this);
    this.raf = null;
    this.previousTime = null;
  }

  handleMouseDown() {
    this.setState({
      mouseDown: !this.state.mouseDown,
    });

    this.raf = window.requestAnimationFrame(this.tick);
  }
  handleMouseUp() {
    window.cancelAnimationFrame(this.raf);
    this.previousTime = null;
    this.setState(prev => ({
      mouseDown: !prev.mouseDown,
    }));
  }

  tick(time){
    let interval = 100;
    if (!this.previousTime || time - interval > this.previousTime) {
      this.previousTime = time;
    } else {
      this.raf = window.requestAnimationFrame(this.tick);
      return;
    }

    if (this.state.mouseDown && this.state.width < 100){
      this.shiftArrange();
      this.setState((prev, c) => ({
        width: ++prev.width,
      }));
      this.raf = window.requestAnimationFrame(this.tick);
      return;
    } else {
      window.cancelAnimationFrame(this.raf);
    }
  }

  randomArrange() {
    let n = this.state.name;
    let index1 = this.randomIndex(n);
    let index2 = this.randomIndex(n);
    while (index1 === index2){
      index2 = this.randomIndex(n);
    }
    let letter1 = n[index1];
    let letter2 = n[index2];
    n = n.slice(0,index2) + letter1 + n.slice(index2+1);
    n = n.slice(0,index1) + letter2 + n.slice(index1+1);
    this.setState(prevState => ({
      name: n,
    }));
  }

  shiftArrange() {
    this.setState((prev) => {
      let n = prev.name;
      let center = n.slice(0,-1);
      // n = n.slice(-1).toUpperCase() + center.toLowerCase();
      n = n.slice(-1) + center;
      return {
        name: n,
      }
    });
  }

  randomIndex(source) {
    return Math.ceil(Math.random()*source.length) - 1;
  }

  render(){
    return (
      <React.Fragment>
        <div className="hello">
          <h1 onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>{this.state.name}</h1>
        </div>
        <div className="goodbye container absolute" style={{width: this.state.width + '%'}}>
          <div className="inverse hello">
            <h1 onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>{this.state.name}</h1>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
