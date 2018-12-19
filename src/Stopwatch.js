import React, { Component } from "react";

let fileReader = null;

class Stopwatch extends Component {
  state = {
    status: false,
    runningTime: 0,
    current: null,
    next: 0,
    script: [
      {
        name: "valentina- wings",
        time: "0:04"
      },
      {
        name: "drekio - aM",
        time: "0:08"
      },
      {
        name: "valentina- wings",
        time: "0:12"
      }
    ]
  };

  handleClick = () => {
    this.setState(state => {
      if (state.status) {
        clearInterval(this.timer);
      } else {
        const startTime = Date.now() - this.state.runningTime;
        this.timer = setInterval(() => {
          this.setState({ runningTime: Date.now() - startTime });
          if (
            this.state.script[this.state.next] != null &&
            this.state.runningTime >=
              this.minutesAndSecondstoMilis(
                this.state.script[this.state.next].time
              )
          ) {
            this.setState({
              current: this.state.next,
              next: this.state.next + 1
            });
          }
        });
      }
      return { status: !state.status };
    });
  };

  // src/App.js
  handleReset = () => {
    clearInterval(this.timer); // new
    this.setState({ runningTime: 0, status: false, current: null, next: 0 });
    document.body.style.backgroundColor = "red";
  };

  millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return seconds == 60
      ? minutes + 1 + ":00"
      : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  minutesAndSecondstoMilis(minutesSeconds) {
    var split = minutesSeconds.split(":");
    var ms = split[0] * 60000 + split[1] * 1000;
    return ms;
  }

  handleFileRead = e => {
    const text = this.fileReader.result;
    this.setState({ script: JSON.parse(text) });
  };

  handleFileChosen = file => {
    this.fileReader = new FileReader();
    this.fileReader.onloadend = this.handleFileRead;

    this.fileReader.readAsText(file, "UTF-8");
  };

  render() {
    const { status, runningTime, script, current, next, loaded } = this.state;
    return (
      <div>
        <input
          type="file"
          id="file"
          accept=".json"
          onChange={e => this.handleFileChosen(e.target.files[0])}
        />

        <p>{this.millisToMinutesAndSeconds(runningTime)}</p>
        <button onClick={this.handleClick}>{status ? "Stop" : "Start"}</button>
        <button onClick={this.handleReset}>Reset</button>
        <h6> Current </h6>
        <p>{current == null ? "" : script[current].name}</p>
        <div>
          <h6>Next:</h6>
          <ul>
            {script.map((todo, index) => {
              if (index >= next)
                return (
                  <li key={index}>
                    {todo.name} - {todo.time}
                  </li>
                );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Stopwatch;
