const sortHighScores = (a, b) => {
  if (a.seconds < b.seconds) {
    return -1;
  } else {
    return 1;
  }
};

export { sortHighScores };
