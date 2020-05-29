import React from "react";

const Prompt = (props) => {
  if (props.show) {
    if (props.highScore) {
      return (
        <div className="prompt">
          <p>High Score! Enter your Name:</p>
          <input type="text" onChange={props.onChange} />
          <button type="button" onClick={props.onSubmit}>
            Submit
          </button>
        </div>
      );
    } else {
      return (
        <div className="prompt">
          <p>Too slow, no high Score</p>
          <div className="link" onClick={props.onClick}>
            View Leaderboard
          </div>
        </div>
      );
    }
  } else {
    return <div></div>;
  }
};

export default Prompt;
