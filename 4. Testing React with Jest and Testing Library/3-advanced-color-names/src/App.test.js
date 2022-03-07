import App, { replaceCamelWithSpaces } from './App';
import { fireEvent, render, screen } from '@testing-library/react';

test('Initial conditions', () => {
  render(<App/>);

  const checkbox = screen.getByRole('checkbox');
  const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' });

  expect(colorButton).toBeEnabled();
  expect(checkbox).not.toBeChecked();
})

test('Button changes colors according to click interactions', () => {
  render(<App/>);

  const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' });
  expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' });

  fireEvent.click(colorButton);

  expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue' });
  expect(colorButton.textContent).toBe('Change to Medium Violet Red');
})

test('Checkbox gets enabled/disabled when clicking', () => {
  render(<App />);

  const checkbox = screen.getByRole('checkbox');
  const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' });

  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();

  fireEvent.click(checkbox);
  expect(colorButton).not.toBeDisabled();
})

test('Disabled button has gray background and reverts to midnight red', () => {
  render(<App />);

  const checkbox = screen.getByRole('checkbox');
  const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' });

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: 'gray' });

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' });
})

describe('camel-case word spaced converter', () => {
  test('No inner capital letters get replaced', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  })

  test('One capital letter gets replaced with spaces', () => {
    expect(replaceCamelWithSpaces('OneCapital')).toBe('One Capital');
  })

  test('Multiple capital letters get replaced', () => {
    expect(replaceCamelWithSpaces('MultipleCapitalLetters')).toBe('Multiple Capital Letters');
  })
})