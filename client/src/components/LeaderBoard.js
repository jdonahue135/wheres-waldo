import React from "react";

import { formatTime } from "../helpers";

const LeaderBoard = (props) => {
  return (
    <div className="leaderboard">
      <div>Leaderboard</div>
      <ol>
        {props.scores.map((score) => (
          <li key={score.name + score.seconds}>
            {score.name + "    " + formatTime(score.seconds)}
          </li>
        ))}
      </ol>
      <div className="link" onClick={props.onClick}>
        Try Again
      </div>
    </div>
  );
};

export default LeaderBoard;
