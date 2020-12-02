import { v4 as uuidv4 } from "uuid";

import { TSong } from '../../types';

const songsData = (): Array<TSong> => {

  return [
    {
      name: "Liar Liar",
      cover: "https://firebasestorage.googleapis.com/v0/b/react-music-app-1f651.appspot.com/o/0365bf9e7ff5e85332c05f3e730ebbc3b1d63f0c.jpg?alt=media&token=f6b355ab-d835-4e17-a16d-4c109b62d81d",
      artist: "Mr.FanTastiC",
      audio: "https://firebasestorage.googleapis.com/v0/b/react-music-app-1f651.appspot.com/o/DAYSLiarLiar.mp3?alt=media&token=735f6be6-72d0-4a04-af66-4feb5bf00680",
      id: uuidv4(),
      active: true,
    },
    {
      name: "表裏一体",
      cover: "https://logonoid.com/images/hunter-x-hunter-logo.jpg",
      artist: "ゆず",
      audio: "https://firebasestorage.googleapis.com/v0/b/react-music-app-1f651.appspot.com/o/HunterHunterEnding.mp3?alt=media&token=e1815c2e-b6dd-4f1e-a34c-c56f4b3a2705",
      id: uuidv4(),
      active: false,
    },
    {
      name: "Hourai Lament",
      cover: "https://i.ytimg.com/vi/px45iVMSRrM/maxresdefault.jpg",
      artist: "SYO & 709sec",
      audio: "https://firebasestorage.googleapis.com/v0/b/react-music-app-1f651.appspot.com/o/HouraiAika.mp3?alt=media&token=a7045c6c-e72e-4640-b218-8f8ebf0e9e63",
      id: uuidv4(),
      active: false,
    },
    {
      name: "Memento",
      cover: "https://pbs.twimg.com/media/EcVPXLoXgAMQNyh.jpg",
      artist: "???",
      audio: "https://firebasestorage.googleapis.com/v0/b/react-music-app-1f651.appspot.com/o/ReZeroSeason%202Ending.mp3?alt=media&token=37f736f3-2035-4bf7-aaf7-2cdc831707d8",
      id: uuidv4(),
      active: false,
    },
  ];
}

export { songsData };