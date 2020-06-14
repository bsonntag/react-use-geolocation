import { useEffect, useState } from 'react';

export function useCurrentPosition(options) {
  const [position, setPosition] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    let canceled = false;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!canceled) {
          setPosition(position);
        }
      },
      (error) => {
        if (!canceled) {
          setError(error);
        }
      },
      options
    );

    return () => {
      canceled = true;
    };
  }, [options]);

  return [position, error];
}
