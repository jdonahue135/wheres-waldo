import React from "react";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
  }

  componentDidMount() {
    //start Timer
    this.timer = setInterval(() => {
      const seconds = this.state.seconds + 1;
      this.setState({ seconds });
    }, 1000);
  }

  componentDidUpdate() {
    if (!this.props.timerStatus) {
      //stop Timer
      clearInterval(this.timer);
    }
  }

  render() {
    let seconds = this.state.seconds % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    const minutes = Math.floor(this.state.seconds / 60);
    const timeString = minutes + ":" + seconds;
    return <div>{timeString}</div>;
  }
}

export default Timer;
