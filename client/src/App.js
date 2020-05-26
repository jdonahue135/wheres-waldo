import React from "react";
import simpsons from "./Simpsons.jpg";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pointerX: null,
      pointerY: null,
      character: null,
      foundCharacters: [],
    };
  }
  componentDidUpdate() {
    console.log(this.state.foundCharacters);
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
            console.log("true");
            let foundCharacters = this.state.foundCharacters.slice();
            foundCharacters.push(target);
            console.log(foundCharacters);
            this.setState({
              foundCharacters,
              character: null,
              pointerY: null,
              pointerX: null,
            });
          } else {
            return false;
          }
        })
        .catch((err) => new Error("error"));
    }
  }
  handleClick = (e) => {
    console.log(e.nativeEvent.offsetX);
    console.log(e.nativeEvent.offsetY);
    this.setState({
      //need to offset the pointers by 1/2 of the length/width of the display box for the box to display correctly
      pointerX: e.nativeEvent.offsetX - 25,
      pointerY: e.nativeEvent.offsetY - 50,
    });
  };
  handleChange = (e) => {
    //set state of character
    this.setState({ character: e.target.value });
  };
  renderSelector = (x, y) => {
    const style = {
      left: x,
      top: y,
    };

    return (
      <div className="selector" style={style}>
        <div className="rectangle" />
        <select name="character" value="null" onChange={this.handleChange}>
          <option defaultValue value={null}>
            Who is it?
          </option>
          <option value="homer">Homer</option>
          <option value="marge">Marge</option>
          <option value="bart">Bart</option>
          <option value="lisa">Lisa</option>
          <option value="maggie">Maggie</option>
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
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Where's Wal'doh!</h1>
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
