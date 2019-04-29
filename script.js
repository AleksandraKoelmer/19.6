
class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.running = false;
    this.times = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
    
    this.print(this.times);

   this.reset = this.reset.bind(this);
   this.print = this.print.bind(this);
   this.format = this.format.bind(this);
   this.start = this.start.bind(this);
   this.step = this.step.bind(this);
   this.calculate = this.calculate.bind(this);
   this.restart = this.restart.bind(this);
   this.stop = this.stop.bind(this);
  //  this.addToList = this.addToList.bind(this);
  //  this.clearList = this.clearList.bind(this);
    
  }

  reset() {
    this.setState(
      this.times = {
        minutes: 0,
        seconds: 0,
        miliseconds:0
      });
  }
  print() {
    
    
    return this.format(this.times);
  }
  format(times) {
    
    return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
  }
  start() {
    console.log(this.times)
    if (!this.running) {
      this.running = true;
      this.watch = setInterval(() => this.step(), 10);
     
    }
  }
  step() {
    if (!this.running) return;
    this.calculate();
    this.setState(
      this.times = {
        minutes: this.times.minutes,
        seconds: this.times.seconds,
        miliseconds:this.times.miliseconds
      });
    this.print();
  }
  calculate() {
    this.times.miliseconds += 1;
    if (this.times.miliseconds >= 100) {
      this.times.seconds += 1;
      this.times.miliseconds = 0;
    }
    if (this.times.seconds >= 60) {
      this.times.minutes += 1;
      this.times.seconds = 0;
    }
  }
  restart() {
    this.reset();
    this.print();
  }
  stop() {
    
    this.running = false;
    clearInterval(this.watch);
  }
 /* addToList() {
    if (this.times.miliseconds != 0 || this.times.seconds != 0 || this.times.miliseconds != 0) {
      
      let results = document.getElementByClassName('results');
      let result = document.createElement("li");
      
    }
  }
  
  clearList() {
    results.innerHTML = '';
  }
*/
  render(){
    
    return(
      <div>
        <nav className={'nav'}>
          <button onClick={this.start}>Start</button>
          <button onClick={this.stop}>Stop</button>
          <button onClick={this.restart}>Reset</button>
          {/* <button onClick={this.addToList()}>Add to list</button>
          <button onClick={this.clearList()}>Clear list</button> */}
        </nav>
        <div>{this.print()}</div>
        <ul className="results"></ul>
      </div>
    )
	}

  }

function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}

var element = React.createElement(Stopwatch);
ReactDOM.render(element, document.getElementById('app'));