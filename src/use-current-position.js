import { useCallback } from 'react';
import usePromise from 'react-use-promise';

function getCurrentPosition(options) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

export function useCurrentPosition(options) {
  return usePromise(useCallback(
    () => getCurrentPosition(options),
    [options]
  ));
}
