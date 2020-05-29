const sortHighScores = (a, b) => {
  if (a.seconds < b.seconds) {
    return -1;
  } else {
    return 1;
  }
};

const formatTime = (seconds) => {
  let secondsValue = seconds % 60;
  secondsValue = secondsValue < 10 ? "0" + secondsValue : secondsValue;
  const minutes = Math.floor(seconds / 60);
  return minutes + ":" + secondsValue;
};

export { sortHighScores, formatTime };
