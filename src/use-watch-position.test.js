import { act, renderHook } from '@testing-library/react-hooks';
import { useWatchPosition } from './use-watch-position';
import EventEmitter from 'events';

beforeEach(() => {
  navigator.geolocation = {
    clearWatch: jest.fn(),
    watchPosition: jest.fn(),
  };
});

test('should return the position', () => {
  navigator.geolocation.watchPosition = (onSuccess) => onSuccess('foo');

  const { result } = renderHook(() => useWatchPosition());
  const [position] = result.current;

  expect(position).toBe('foo');
});

test('should return the error', () => {
  navigator.geolocation.watchPosition = (onSuccess, onError) => onError('bar');

  const { result } = renderHook(() => useWatchPosition());
  const [, error] = result.current;

  expect(error).toBe('bar');
});

test('should return the updated position', () => {
  const emitter = new EventEmitter();

  navigator.geolocation.watchPosition = (onSuccess) => {
    onSuccess('foo');

    emitter.on('update', onSuccess);
  };

  const { result } = renderHook(() => useWatchPosition());
  let position = result.current[0];

  expect(position).toBe('foo');

  act(() => {
    emitter.emit('update', 'bar');
  });

  position = result.current[0];

  expect(position).toBe('bar');
});

test('should clear the watch', () => {
  navigator.geolocation.watchPosition = () => 'foo';

  const { unmount } = renderHook(() => useWatchPosition());

  unmount();

  expect(navigator.geolocation.clearWatch).toHaveBeenCalledWith('foo');
});
