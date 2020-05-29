import React from "react";

const Prompt = (props) => {
  return props.show ? (
    <div className="prompt">
      <p>High Score! Enter your Name:</p>
      <input type="text" onChange={props.onChange} />
      <button type="button" onClick={props.onSubmit}>
        Submit
      </button>
    </div>
  ) : (
    <div></div>
  );
};

export default Prompt;
