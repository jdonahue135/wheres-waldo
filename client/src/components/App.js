import React from "react";
import { sortHighScores } from "../helpers";

import Timer from "./Timer";
import Prompt from "./Prompt";
import GameImage from "./GameImage";
import Selector from "./Selector";
import LeaderBoard from "./LeaderBoard";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pointerX: null,
      pointerY: null,
      character: null,
      foundCharacters: [],
      gameStatus: true,
      startTime: null,
      endTime: null,
      showPrompt: false,
      highScore: false,
      playerName: null,
      highScores: null,
      showLeaderboard: false,
    };
  }

  componentDidMount() {
    fetch("/startTime")
      .then((res) => res.json())
      .then((res) => this.setState({ startTime: res }));

    fetch("/highScores")
      .then((res) => res.json())
      .then((res) => res.sort(sortHighScores))
      .then((highScores) => this.setState({ highScores }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.foundCharacters.length === 5 &&
      this.state.gameStatus === true
    ) {
      //user completed game, get time of finish
      fetch("/endTime")
        .then((res) => res.json())
        .then((res) =>
          this.setState({
            endTime: res,
            gameStatus: false,
          })
        );
    }

    //this will be called after above function gets endTime from the API
    if (
      !this.state.gameStatus &&
      this.state.gameStatus !== prevState.gameStatus
    ) {
      //user found all characters, check if new high score. Only do this once
      const finishTime = Math.floor(
        (this.state.endTime[0] - this.state.startTime[0]) / 1000
      );
      finishTime < this.state.highScores[4].seconds
        ? this.handleHighScore()
        : this.setState({ showPrompt: true });
    }

    //this is called after handleSelectChange
    if (this.state.character) {
      //call the api to validate character location
      fetch("/validate")
        .then((res) => res.json())
        .then((res) =>
          res.find((character) => character.name === this.state.character)
        )
        .then((target) => {
          //validate that target is in selector
          if (
            target.x >= this.state.pointerX &&
            target.x <= this.state.pointerX + 50 &&
            target.y >= this.state.pointerY &&
            target.y <= this.state.pointerY + 100
          ) {
            //selection is correct, add character to found list
            let foundCharacters = this.state.foundCharacters.slice();
            foundCharacters.push(target);
            this.setState({
              foundCharacters,
              character: null,
              pointerY: null,
              pointerX: null,
            });
          } else {
            //incorrect selection
            document.querySelector(".rectangle").classList.add("incorrect");
            this.setState({ character: null });
          }
        })
        .catch((err) => console.log(err));
    }
  }

  handleClick = (e) => {
    if (this.state.gameStatus) {
      const selector = document.querySelector(".rectangle");
      if (selector) {
        selector.classList.remove("incorrect");
      }
      this.setState({
        //need to offset the pointers by 1/2 of the length/width of the display box for the box to display correctly
        pointerX: e.nativeEvent.offsetX - 25,
        pointerY: e.nativeEvent.offsetY - 50,
      });
    }
  };

  handleSelectChange = (e) => {
    //set state of character
    this.setState({ character: e.target.value.toLowerCase() });
  };

  renderFoundIcon(character) {
    const style = {
      left: character.x - 25,
      top: character.y - 25,
    };
    return (
      <div className="found-character" key={character.name} style={style} />
    );
  }

  handleHighScore() {
    //prompt for name
    this.setState({
      showPrompt: true,
      highScore: true,
    });
  }

  handlePromptChange = (e) => {
    this.setState({ playerName: e.target.value });
  };

  handlePromptSubmit() {
    if (!this.state.playerName) {
      return;
    }

    //post name and seconds to highScore route
    const seconds = Math.floor(
      (this.state.endTime[0] - this.state.startTime[0]) / 1000
    );

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: this.state.playerName, seconds: seconds }),
    };

    fetch("/highScores", requestOptions)
      .then((res) => res.json())
      .then((res) => res.sort(sortHighScores))
      .then((res) =>
        this.setState({
          showPrompt: false,
          showLeaderboard: true,
          highScores: res,
        })
      );
  }

  toggleLeaderboard() {
    if (this.state.showLeaderboard) {
      window.location.reload();
      return false;
    }
    this.setState({
      showLeaderboard: true,
      showPrompt: false,
    });
  }

  render() {
    return (
      <div className="App">
        <Prompt
          show={this.state.showPrompt}
          onChange={this.handlePromptChange.bind(this)}
          onSubmit={this.handlePromptSubmit.bind(this)}
          onClick={this.toggleLeaderboard.bind(this)}
        />
        <header className="App-header">
          <h1>Where's Wal'doh!</h1>
          <h2>Find The Simpsons Family (Standard character versions only)</h2>
        </header>
        {!this.state.showLeaderboard ? (
          <div className="App">
            <Timer timerStatus={this.state.gameStatus} />
            <div className="photo-container">
              {this.state.pointerX ? (
                <Selector
                  x={this.state.pointerX}
                  y={this.state.pointerY}
                  onChange={this.handleSelectChange}
                  foundCharacters={this.state.foundCharacters}
                />
              ) : (
                <div></div>
              )}
              {this.state.foundCharacters.length > 0 ? (
                this.state.foundCharacters.map((character) =>
                  this.renderFoundIcon(character)
                )
              ) : (
                <div></div>
              )}
              <GameImage onClick={this.handleClick} />
            </div>
          </div>
        ) : (
          <LeaderBoard
            scores={this.state.highScores}
            onClick={this.toggleLeaderboard.bind(this)}
          />
        )}
      </div>
    );
  }
}

export default App;
