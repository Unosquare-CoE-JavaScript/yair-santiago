import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const buttonStyle = buttonColor => ({
  backgroundColor: buttonColor, 
  color: 'white'
})

function App() {
  const [buttonColor, setButtonColor] = useState('red');
  const [disabled, setDisabled] = useState(false);

  const newColor = buttonColor === 'red'
    ? 'blue'
    : 'red';

  const alternateColor = () => setButtonColor(newColor);
  const handleChecked = ({ target: { checked } }) => setDisabled(checked);

  return (
    <div className="App">
      <button
        style={buttonStyle(buttonColor)}
        onClick={alternateColor}
        disabled={disabled}
      >
        Change to {newColor}
      </button>
      <input 
        type="checkbox" 
        defaultChecked={false}
        aria-checked={disabled}
        onChange={handleChecked}
        id="check-disable-button"
      />
    </div>
  );
}

export default App;
