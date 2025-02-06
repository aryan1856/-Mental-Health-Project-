import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import SettingsButton from "./SettingsButton";
import { useContext, useState, useEffect, useRef } from "react";
import SettingsContext from "../../Context/SettingsContext";
import "../../Styles/Slider.css";

const red = '#f54e4e';

function Timer() {
  const settingsInfo = useContext(SettingsContext);

  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState('work');
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {

    function switchMode() {
      const nextMode = 'work';
      const nextSeconds = settingsInfo.workMinutes * 60;

      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }

    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [settingsInfo]);

  const totalSeconds = settingsInfo.workMinutes * 60;
  const percentage = Math.round(secondsLeft / totalSeconds * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = '0' + seconds;

  return (
    <div>
      <div className="meditation-container">
        <CircularProgressbar
          value={percentage}
          text={minutes + ':' + seconds}
          styles={buildStyles({
            textColor: '#fff',
            pathColor: `url(#gradient)`, // Reference the gradient
            trailColor: 'rgba(255,255,255,.2)',
          })}
          strokeWidth={10}
        />
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f54e4e" />
              <stop offset="100%" stopColor="#ffcc00" />
            </linearGradient>
          </defs>
        </svg>
        <div>
        {isPaused
          ? <PlayButton onClick={() => { setIsPaused(false); isPausedRef.current = false; }} />
          : <PauseButton onClick={() => { setIsPaused(true); isPausedRef.current = true; }} />}
        </div>
      </div>
      <div>
        <SettingsButton className="setting-btn" onClick={() => settingsInfo.setShowSettings(true)} />
      </div>
    </div>
  );
}

export default Timer;
