/* setState przyjmuje obiekt jako argument. Twoj zapis (this.state = {...) 
  jest problematyczny w zrozumieniu

  tak samo w calculate nie modyfikuj this.state bezposrednio, 
  tylko  przypisz to do zmiennych, zaktualizuj je i ustaw setState
 */

class Stopwatch extends React.Component {
  constructor() {
    super();
    this.running = false;
    this.state = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };

    this.print(this.state.minutes + this.state.seconds + this.state.miliseconds);
    this.start = this.start.bind(this);
    this.restart = this.restart.bind(this);
    this.stop = this.stop.bind(this);
  }

  reset() {
    this.setState({
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    });
  }

  print() {
    return this.format(this.state);
  }

  format(state) {
    return `${pad0(state.minutes)}:${pad0(state.seconds)}:${pad0(Math.floor(state.miliseconds))}`;
  }

  start() {
    if (!this.running) {
      this.running = true;
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  step() {
    if (!this.running) return;
    this.calculate();
    this.print();
  }

  calculate() {
    let miliseconds = this.state.miliseconds;
    let seconds = this.state.seconds;
    let minutes = this.state.minutes;

    miliseconds += 1;
    if (miliseconds >= 100) {
      seconds += 1;
      miliseconds = 0;
    }
    if (seconds >= 60) {
      minutes += 1;
      seconds = 0;
    }
    this.setState({
      miliseconds: miliseconds,
      seconds: seconds,
      miliseconds: miliseconds
    })
  }

  restart() {
    this.reset();
    this.print();
  }

  stop() {
    this.running = false;
    clearInterval(this.watch);
  }

  render() {
    return (
      <div>
        <nav className={'nav'}>
          <button onClick={this.start}>Start</button>
          <button onClick={this.stop}>Stop</button>
          <button onClick={this.restart}>Reset</button>
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