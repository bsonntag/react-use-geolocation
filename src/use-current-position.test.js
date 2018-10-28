import { render, wait } from 'react-testing-library';
import { useCurrentPosition } from './use-current-position';
import React from 'react';

const Test = () => {
  const [position, error] = useCurrentPosition();

  if (!position && !error) {
    return 'waiting';
  }

  if (error) {
    return error;
  }

  return position;
};

beforeEach(() => delete navigator.geolocation);

test('should return the position', async () => {
  navigator.geolocation = {
    getCurrentPosition: onSuccess => onSuccess('foo')
  };

  const { container, rerender } = render(<Test />);

  expect(container).toHaveTextContent('waiting');

  await wait(() => {
    rerender(<Test />);
    expect(container).toHaveTextContent('foo');
  });
});

test('should return the error', async () => {
  navigator.geolocation = {
    getCurrentPosition: (onSuccess, onError) => onError('bar')
  };

  const { container, rerender } = render(<Test />);

  expect(container).toHaveTextContent('waiting');

  await wait(() => {
    rerender(<Test />);
    expect(container).toHaveTextContent('bar');
  });
});
