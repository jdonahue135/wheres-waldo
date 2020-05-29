import React from "react";

const Selector = (props) => {
  //rectangle coordinates
  const style = {
    left: props.x,
    top: props.y,
  };

  //character names that are not found yet
  let names = [];

  const characterNames = ["homer", "marge", "bart", "lisa", "maggie"];

  for (let i = 0; i < characterNames.length; i++) {
    const result = props.foundCharacters.find(
      (character) => character.name === characterNames[i]
    );
    if (!result) {
      names.push(
        characterNames[i][0].toUpperCase() + characterNames[i].slice(1)
      );
    }
  }

  return (
    <div className="selector" style={style}>
      <div className="rectangle" />
      <select name="character" value="null" onChange={props.onChange}>
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

export default Selector;
