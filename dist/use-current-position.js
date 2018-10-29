"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCurrentPosition = useCurrentPosition;

var _react = require("react");

var _reactUsePromise = _interopRequireDefault(require("react-use-promise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCurrentPosition(options) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

function useCurrentPosition(options) {
  return (0, _reactUsePromise.default)((0, _react.useCallback)(function () {
    return getCurrentPosition(options);
  }, [options]));
}