import React, { useState, useRef } from "react";
import TimeSlider from "react-input-slider";

import "./PlayerBar.css";
// import TetImg from "./images/tet.jpg";
// import PrevIcon from "./icons/PrevIcon";
// import NextIcon from "./icons/NextIcon";
// import PauseIcon from "./icons/PauseIcon";
// import PlayIcon from "./icons/PlayIcon";
import audios from "../audios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { faForward } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { faCirclePause } from "@fortawesome/free-solid-svg-icons";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";

import { library } from "@fortawesome/fontawesome-svg-core";
library.add(
  faBackward,
  faForward,
  faCirclePlay,
  faCirclePause,
  faRepeat,
  faShuffle
);

function PlayMode(props) {
  if (props.playmode === 0) {
    return (
      <div className="play-mode-button">
        <FontAwesomeIcon icon="fa-solid fa-repeat" />
      </div>
    );
  } else if (props.playmode === 1) {
    return (
      <div className="repeat-one-button play-mode-button">
        <FontAwesomeIcon icon="fa-solid fa-repeat" />
        <span>1</span>
      </div>
    );
  } else {
    return (
      <div className="play-mode-button">
        <FontAwesomeIcon icon="fa-solid fa-shuffle" />
      </div>
    );
  }
}
const PlayerBar = () => {
  const audioRef = useRef();
  const [audioIndex, setAudioIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playMode, setPlayMode] = useState(0);
  const [isPlay, setPlay] = useState(false);

  const handleLoadedData = () => {
    setDuration(audioRef.current.duration);
    if (isPlay) audioRef.current.play();
  };
  const handleNextAudio = () => {
    switch (playMode) {
      case 0: //repeat
        setAudioIndex((audioIndex + 1) % audios.length);
        break;
      case 1: //repeat one
        setCurrentTime(0);
        audioRef.current.play();
        break;
      case 2: //shuffle
        let random_num;
        while (
          (random_num = Math.floor(Math.random() * audios.length)) ===
          audioIndex
        );
        setAudioIndex(random_num);
        break;
      default:
        console.log("error play mode");
        break;
    }
  };

  const handlePausePlayClick = () => {
    if (isPlay) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlay(!isPlay);
  };

  const handleTimeSliderChange = ({ x }) => {
    audioRef.current.currentTime = x;
    setCurrentTime(x);

    if (!isPlay) {
      setPlay(true);
      audioRef.current.play();
    }
  };

  return (
    <div className="bottom-bar">
      <div className="player-bar">
        <div className="Control-Button-Group">
          <div
            className="Prev-Button"
            onClick={() => setAudioIndex((audioIndex - 1) % audios.length)}
          >
            <FontAwesomeIcon icon="fa-solid fa-backward" />
            {/* <PrevIcon /> */}
          </div>
          <div
            className="Pause-Play-Button"
            id="pause-play"
            onClick={handlePausePlayClick}
          >
            {isPlay ? (
              <FontAwesomeIcon icon="fa-solid fa-circle-pause" />
            ) : (
              <FontAwesomeIcon icon="fa-solid fa-circle-play" />
            )}
          </div>
          <div
            className="Next-Button"
            onClick={() => setAudioIndex((audioIndex + 1) % audios.length)}
          >
            <FontAwesomeIcon icon="fa-solid fa-forward" />
          </div>
          <div
            className="Play-Mode-Button"
            onClick={() => setPlayMode((playMode + 1) % 3)}
          >
            <PlayMode playmode={playMode} />
          </div>
        </div>
        <TimeSlider
          className="slider-bar"
          axis="x"
          xmax={duration}
          x={currentTime}
          onChange={handleTimeSliderChange}
          styles={{
            track: {
              backgroundColor: "rgba(155, 145, 145, 0.442)",
              height: "2px",
            },
            active: {
              backgroundColor: "white",
              height: "2px",
            },
            thumb: {
              width: "8px",
              height: "8px",
              backgroundColor: "white",
              borderRadius: 0,
            },
          }}
        />
      </div>
      <div className="artist-info">
        <p className="Singer">
          <strong>{audios[audioIndex].title}-</strong>
          {audios[audioIndex].artist}
        </p>
      </div>
      <audio
        id="audio"
        ref={audioRef}
        src={audios[audioIndex].src}
        onLoadedData={handleLoadedData}
        onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
        onEnded={handleNextAudio}
      />
    </div>
  );
};

export default PlayerBar;
