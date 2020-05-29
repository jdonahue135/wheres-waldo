import React from "react";

import simpsons from "../Simpsons.jpg";

const GameImage = (props) => {
  return <img src={simpsons} alt="simpsons" onClick={props.onClick} />;
};

export default GameImage;
