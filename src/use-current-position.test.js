import { renderHook } from '@testing-library/react-hooks';
import { useCurrentPosition } from './use-current-position';

afterEach(() => {
  delete navigator.geolocation;
});

test('should return the position', () => {
  navigator.geolocation = {
    getCurrentPosition: onSuccess => onSuccess('foo')
  };

  const { result } = renderHook(() => useCurrentPosition());
  const [position] = result.current;

  expect(position).toBe('foo');
});

test('should return the error', () => {
  navigator.geolocation = {
    getCurrentPosition: (onSuccess, onError) => onError('bar')
  };

  const { result } = renderHook(() => useCurrentPosition());
  const [, error] = result.current;

  expect(error).toBe('bar');
});
