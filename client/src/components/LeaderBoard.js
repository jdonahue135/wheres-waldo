import React from "react";

const LeaderBoard = (props) => {
  return (
    <div>
      <div>Leader Board</div>
      {props.scores.map((score) => (
        <div key={score.name + score.seconds}>
          {score.name + " " + score.seconds}
        </div>
      ))}
      <div onClick={props.onClick}>Try Again</div>
    </div>
  );
};

export default LeaderBoard;
