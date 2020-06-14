import { useEffect, useState } from 'react';

export function useWatchPosition(options) {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const watch = navigator.geolocation.watchPosition(
      setPosition,
      setError,
      options
    );

    return () => navigator.geolocation.clearWatch(watch);
  }, [options]);

  return [position, error];
}
