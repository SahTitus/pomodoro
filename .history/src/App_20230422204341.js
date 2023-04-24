import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';
import ProgressBar from 'progressbar.js';
import { ChromePicker } from 'react-color';
import GoogleFontLoader from 'react-google-font-loader';

function App() {
  const [timerDuration, setTimerDuration] = useState(25);
  const [shortBreakDuration, setShortBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timerDuration * 60);
  const [progressBar, setProgressBar] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [textColor, setTextColor] = useState('#000000');
  const [progressBarColor, setProgressBarColor] = useState('#4CAF50');
  const [fontFamily, setFontFamily] = useState('Roboto');

  useEffect(() => {
    if (progressBar) {
      progressBar.animate(1 - (timeLeft / (timerDuration * 60)), {
        duration: 60 * 1000,
      });
    }
  }, [timeLeft]);

  const startTimer = () => {
    setTimerActive(true);
    setTimeLeft(timerDuration * 60);
    const newProgressBar = new ProgressBar.Circle('#progressBar', {
      color: progressBarColor,
      strokeWidth: 6,
      trailWidth: 1,
      trailColor: '#CCCCCC',
      easing: 'easeInOut',
      duration: 60 * 1000,
      text: {
        className: 'progress-text',
        value: `${timeLeft / 60}:00`,
      },
      svgStyle: {
        display: 'block',
        width: '100%',
        height: 'auto',
      },
      step: (state, circle) => {
        circle.setText(`${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`);
      },
    });
    setProgressBar(newProgressBar);
    newProgressBar.animate(1, {
      duration: timeLeft * 1000,
    }, () => {
      setTimerActive(false);
      if (timeLeft === timerDuration * 60) {
        setTimeLeft(longBreakDuration * 60);
      } else if (timeLeft === longBreakDuration * 60) {
        setTimeLeft(timerDuration * 60);
      } else {
        setTimeLeft(shortBreakDuration * 60);
      }
    });
  };

  return (
    <div style={{ backgroundColor, color: textColor, fontFamily }}>
      <GoogleFontLoader fonts={[{ font: fontFamily }]} />
      <h1>Pomodoro Timer</h1>
      <div>
        <label htmlFor="timerDurationInput">Pomodoro Duration (minutes): </label>
        <input
          id="timerDurationInput"
          type="number"
          min={1}
          max={60}
          value={timerDuration}
          onChange={(e) => setTimerDuration(parseInt(e.target.value, 10))}
          disabled={timerActive}
        />
      </div>
      <div>
        <label htmlFor="shortBreakDurationInput">Short Break Duration (minutes): </label>
        <input
          id="shortBreakDurationInput"
          type="number"
          min={1}
          max={60}
          value={shortBreakDuration}
          onChange={(e) => setShortBreakDuration(parseInt(e.target.value, 10))}
          disabled={timerActive}
        />
      </div>
        <div>
    <label htmlFor="longBreakDurationInput">Long Break Duration (minutes): </label>
    <input
      id="longBreakDurationInput"
      type="number"
      min={1}
      max={60}
      value={longBreakDuration}
      onChange={(e) => setLongBreakDuration(parseInt(e.target.value, 10))}
      disabled={timerActive}
    />
  </div>
  <div>
    <label htmlFor="backgroundColorPicker">Background Color: </label>
    <ChromePicker
      color={backgroundColor}
      onChange={(color) => setBackgroundColor(color.hex)}
    />
  </div>
  <div>
    <label htmlFor="textColorPicker">Text Color: </label>
    <ChromePicker
      color={textColor}
      onChange={(color) => setTextColor(color.hex)}
    />
  </div>
  <div>
    <label htmlFor="progressBarColorPicker">Progress Bar Color: </label>
    <ChromePicker
      color={progressBarColor}
      onChange={(color) => setProgressBarColor(color.hex)}
    />
  </div>
  <div>
    <label htmlFor="fontFamilySelector">Font Family: </label>
    <select
      id="fontFamilySelector"
      value={fontFamily}
      onChange={(e) => setFontFamily(e.target.value)}
    >
      <option value="Roboto">Roboto</option>
      <option value="Arial">Arial</option>
      <option value="Times New Roman">Times New Roman</option>
    </select>
  </div>
  <div id="timer">
    {timerActive ? (
      <button onClick={() => setTimerActive(false)}>Stop Timer</button>
    ) : (
      <button onClick={startTimer}>Start Timer</button>
    )}
    <div id="progressBar" />
  </div>
</div>

)}

export default App;
