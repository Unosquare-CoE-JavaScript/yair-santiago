import App from './App';
import { fireEvent, render, screen } from '@testing-library/react';

test('Button has correct initial color', () => {
  render(<App/>);

  const colorButton = screen.getByRole('button', { name: 'Change to blue' });
  expect(colorButton).toHaveStyle({ backgroundColor: 'red' });

  fireEvent.click(colorButton);

  expect(colorButton).toHaveStyle({ backgroundColor: 'blue' });
  expect(colorButton.textContent).toBe('Change to red');
})

test('Initial conditions', () => {
  render(<App/>);

  const checkbox = screen.getByRole('checkbox');
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });

  expect(colorButton).toBeEnabled();
  expect(checkbox).not.toBeChecked();
})

test('Checkbox gets enabled/disabled when clicking', () => {
  render(<App />);

  const checkbox = screen.getByRole('checkbox');
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });

  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();

  fireEvent.click(checkbox);
  expect(colorButton).not.toBeDisabled();
})

test('Disabled button has gray background and reverts to red', () => {
  render(<App />);

  const checkbox = screen.getByRole('checkbox');
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: 'gray' });

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: 'red' });
})