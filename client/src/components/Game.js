import React from "react";

const Game = (props) => {
  return (
    <header className="App-header">
      <Link to="/leaderboard">View leaderboard</Link>
      <Timer timerStatus={props.status} />
      <div className="photo-container">
        {props.pointerX ? (
          <Selector
            x={props.pointerX}
            y={props.pointerY}
            onChange={props.handleChange}
            foundCharacters={props.foundCharacters}
          />
        ) : (
          <div></div>
        )}
        {props.foundCharacters.length > 0 ? (
          props.foundCharacters.map((character) =>
            props.renderFoundIcon(character)
          )
        ) : (
          <div></div>
        )}
        <GameImage onClick={props.handleClick} />
      </div>
    </header>
  );
};
