import React from "react";

import { formatTime } from "../helpers";

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
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const timeString = formatTime(this.state.seconds);
    return <div className="timer">{timeString}</div>;
  }
}

export default Timer;
