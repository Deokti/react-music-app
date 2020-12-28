

const convertTimeToPercent = (currentTimeSong: number, durationAudio: number) => {
  return Math.floor((Math.floor(currentTimeSong) / Math.floor(durationAudio)) * 100)
};

export { convertTimeToPercent };
