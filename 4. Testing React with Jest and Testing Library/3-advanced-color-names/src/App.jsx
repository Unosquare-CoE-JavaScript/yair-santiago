import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const reCamelcaseLetter = /\B([A-Z])\B/g;

export const replaceCamelWithSpaces = colorName => (
  colorName.replace(reCamelcaseLetter, ' $1')
)

const buttonStyle = (buttonColor, disabled) => ({
  backgroundColor: disabled ? 'gray' : buttonColor, 
  color: 'white'
})

function App() {
  const [buttonColor, setButtonColor] = useState('MediumVioletRed');
  const [disabled, setDisabled] = useState(false);

  const newColor = buttonColor === 'MediumVioletRed'
    ? 'MidnightBlue'
    : 'MediumVioletRed';

  const alternateColor = () => setButtonColor(newColor);
  const handleChecked = ({ target: { checked } }) => setDisabled(checked);

  return (
    <div className="App">
      <button
        style={buttonStyle(buttonColor, disabled)}
        onClick={alternateColor}
        disabled={disabled}
      >
        Change to {replaceCamelWithSpaces(newColor)}
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
