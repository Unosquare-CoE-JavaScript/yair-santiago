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