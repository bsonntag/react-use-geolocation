import { render, wait } from 'react-testing-library';
import { useWatchPosition } from './use-watch-position';
import EventEmitter from 'events';
import React from 'react';

const Test = () => {
  const [position, error] = useWatchPosition();

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
    watchPosition: onSuccess => onSuccess('foo')
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
    watchPosition: (onSuccess, onError) => onError('bar')
  };

  const { container, rerender } = render(<Test />);

  expect(container).toHaveTextContent('waiting');

  await wait(() => {
    rerender(<Test />);
    expect(container).toHaveTextContent('bar');
  });
});

test('should return the updated position', async () => {
  const emitter = new EventEmitter();

  navigator.geolocation = {
    watchPosition(onSuccess) {
      onSuccess('foo');

      emitter.on('update', onSuccess);
    }
  };

  const { container, rerender } = render(<Test />);

  expect(container).toHaveTextContent('waiting');

  await wait(() => {
    rerender(<Test />);
    expect(container).toHaveTextContent('foo');
  });

  emitter.emit('update', 'bar');

  expect(container).toHaveTextContent('bar');
});

test('should clear the watch', () => {
  navigator.geolocation = {
    clearWatch: jest.fn(),
    watchPosition: () => 'foo'
  };

  const { unmount } = render(<Test />);

  unmount();

  expect(navigator.geolocation.clearWatch).toHaveBeenCalledWith('foo');
});
