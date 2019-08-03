import { render } from 'react-dom';
import { useCurrentPosition } from '../src';
import React from 'react';

const Example = () => {
  const [position, error] = useCurrentPosition();

  if (!position && !error) {
    return 'Waiting...';
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <p>
        {'Latitude: '}
        {position.coords.latitude}
      </p>
      <p>
        {'Longitude: '}
        {position.coords.longitude}
      </p>
    </>
  );
};

render(<Example />, document.getElementById('root'));
