# react-use-geolocation

[![CircleCI](https://circleci.com/gh/bsonntag/react-use-geolocation.svg?style=svg)](https://circleci.com/gh/bsonntag/react-use-geolocation)
[![Coverage Status](https://coveralls.io/repos/github/bsonntag/react-use-geolocation/badge.svg?branch=master)](https://coveralls.io/github/bsonntag/react-use-geolocation?branch=master)

React hook for accessing geolocation.

## Installation

Using npm:

```sh
$ npm install --save react-use-geolocation
```

Using yarn:

```sh
$ yarn add react-use-geolocation
```

Since this module uses React's new Hooks feature,
to try this out you'll need to install the `16.8.0` version
of `react` and `react-dom`:

```sh
$ yarn add react@^16.8.0 react-dom@^16.8.0
```

## Usage

```js
import { useCurrentPosition } from 'react-use-geolocation';
import React from 'react';

function Example() {
  const [position, error] = useCurrentPosition();

  if (!position && !error) {
    return <p>Waiting...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      <p>
        Latitude: {position.coords.latitude}
      </p>
      <p>
        Longitude: {position.coords.longitude}
      </p>
    </div>
  );
}
```

## API

```js
import { useCurrentPosition } from 'react-use-geolocation';

useCurrentPosition(options?: PositionOptions): [
  ?Position,
  ?PositionError
]
```

Identical to [`getCurrentPosition`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition).
Receives an optional [PositionOptions](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions)
and returns a tuple with the [position](https://developer.mozilla.org/en-US/docs/Web/API/Position)
and the [error](https://developer.mozilla.org/en-US/docs/Web/API/PositionError).

```js
import { useWatchPosition } from 'react-use-geolocation';

useWatchPosition(options?: PositionOptions): [
  ?Position,
  ?PositionError
]
```

Same API as `useCurrentPosition`, but watches the location and
updates the component when the location changes.

## Contributing

Please feel free to submit any issues or pull requests.

## License

MIT
