import React from "react";
import simpsons from "./Simpsons.jpg";
import "./App.css";

import Timer from "./Timer";
import Prompt from "./Prompt";

import { sortHighScores } from "./helpers";

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
      playerName: null,
    };
    this.characterNames = ["homer", "marge", "bart", "lisa", "maggie"];
  }

  componentDidMount() {
    fetch("/startTime")
      .then((res) => res.json())
      .then((res) => this.setState({ startTime: res }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !this.state.gameStatus &&
      this.state.gameStatus !== prevState.gameStatus
    ) {
      //user found all characters, check if new high score. Only do this once
      const finishTime = Math.floor(
        (this.state.endTime[0] - this.state.startTime[0]) / 1000
      );
      fetch("/highScores")
        .then((res) => res.json())
        .then((res) => res.sort(sortHighScores))
        .then((highScores) =>
          finishTime < highScores[4].seconds
            ? this.handleHighScore()
            : console.log("not a high score")
        );
    }

    if (
      this.state.foundCharacters.length === 5 &&
      this.state.gameStatus === true
    ) {
      console.log("winner!");
      fetch("/endTime")
        .then((res) => res.json())
        .then((res) =>
          this.setState({
            endTime: res,
            gameStatus: false,
          })
        );
    }

    if (this.state.character) {
      //call the api to validate character location
      fetch("/validate")
        .then((res) => res.json())
        .then((res) =>
          res.find((character) => character.name === this.state.character)
        )
        .then((target) => {
          //validate x
          if (
            target.x >= this.state.pointerX &&
            target.x <= this.state.pointerX + 50 &&
            target.y >= this.state.pointerY &&
            target.y <= this.state.pointerY + 100
          ) {
            let foundCharacters = this.state.foundCharacters.slice();
            foundCharacters.push(target);
            this.setState({
              foundCharacters,
              character: null,
              pointerY: null,
              pointerX: null,
            });
          } else {
            document.querySelector(".rectangle").classList.add("incorrect");
            this.setState({ character: null });
          }
        })
        .catch((err) => new Error("error"));
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

  handlePromptChange = (e) => {
    this.setState({ playerName: e.target.value });
  };

  renderSelector = (x, y) => {
    //rectangle coordinates
    const style = {
      left: x,
      top: y,
    };

    //character names that are not found yet
    let names = [];
    for (let i = 0; i < this.characterNames.length; i++) {
      const result = this.state.foundCharacters.find(
        (character) => character.name === this.characterNames[i]
      );
      if (!result) {
        names.push(
          this.characterNames[i][0].toUpperCase() +
            this.characterNames[i].slice(1)
        );
      }
    }

    return (
      <div className="selector" style={style}>
        <div className="rectangle" />
        <select
          name="character"
          value="null"
          onChange={this.handleSelectChange}
        >
          <option defaultValue value={null}>
            Who is it?
          </option>
          {names.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
    );
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
    this.setState({ showPrompt: true });
  }

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

    console.log(requestOptions.body);

    fetch("/highScores", requestOptions)
      .then((res) => res.json())
      .then((res) => console.log(res));
    this.setState({ showPrompt: false });
  }

  render() {
    return (
      <div className="App">
        <Prompt
          show={this.state.showPrompt}
          onChange={this.handlePromptChange.bind(this)}
          onSubmit={this.handlePromptSubmit.bind(this)}
        />
        <header className="App-header">
          <h1>Where's Wal'doh!</h1>
          <h2>Find The Simpsons Family (Standard character versions only)</h2>
          <Timer timerStatus={this.state.gameStatus} />
          <div className="photo-container">
            {this.state.pointerX ? (
              this.renderSelector(this.state.pointerX, this.state.pointerY)
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
            <img src={simpsons} alt="simpsons" onClick={this.handleClick} />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
