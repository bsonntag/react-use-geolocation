"use strict";

var _reactTestingLibrary = require("react-testing-library");

var _useWatchPosition3 = require("./use-watch-position");

var _events = _interopRequireDefault(require("events"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Test = function Test() {
  var _useWatchPosition = (0, _useWatchPosition3.useWatchPosition)(),
      _useWatchPosition2 = _slicedToArray(_useWatchPosition, 2),
      position = _useWatchPosition2[0],
      error = _useWatchPosition2[1];

  if (!position && !error) {
    return 'waiting';
  }

  if (error) {
    return error;
  }

  return position;
};

beforeEach(function () {
  return delete navigator.geolocation;
});
test('should return the position',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  var _render, container, rerender;

  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          navigator.geolocation = {
            watchPosition: function watchPosition(onSuccess) {
              return onSuccess('foo');
            }
          };
          _render = (0, _reactTestingLibrary.render)(_react.default.createElement(Test, null)), container = _render.container, rerender = _render.rerender;
          expect(container).toHaveTextContent('waiting');
          _context.next = 5;
          return (0, _reactTestingLibrary.wait)(function () {
            rerender(_react.default.createElement(Test, null));
            expect(container).toHaveTextContent('foo');
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));
test('should return the error',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee2() {
  var _render2, container, rerender;

  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          navigator.geolocation = {
            watchPosition: function watchPosition(onSuccess, onError) {
              return onError('bar');
            }
          };
          _render2 = (0, _reactTestingLibrary.render)(_react.default.createElement(Test, null)), container = _render2.container, rerender = _render2.rerender;
          expect(container).toHaveTextContent('waiting');
          _context2.next = 5;
          return (0, _reactTestingLibrary.wait)(function () {
            rerender(_react.default.createElement(Test, null));
            expect(container).toHaveTextContent('bar');
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this);
})));
test('should return the updated position',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee3() {
  var emitter, _render3, container, rerender;

  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          emitter = new _events.default();
          navigator.geolocation = {
            watchPosition: function watchPosition(onSuccess) {
              onSuccess('foo');
              emitter.on('update', onSuccess);
            }
          };
          _render3 = (0, _reactTestingLibrary.render)(_react.default.createElement(Test, null)), container = _render3.container, rerender = _render3.rerender;
          expect(container).toHaveTextContent('waiting');
          _context3.next = 6;
          return (0, _reactTestingLibrary.wait)(function () {
            rerender(_react.default.createElement(Test, null));
            expect(container).toHaveTextContent('foo');
          });

        case 6:
          emitter.emit('update', 'bar');
          expect(container).toHaveTextContent('bar');

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3, this);
})));
test('should clear the watch', function () {
  navigator.geolocation = {
    clearWatch: jest.fn(),
    watchPosition: function watchPosition() {
      return 'foo';
    }
  };

  var _render4 = (0, _reactTestingLibrary.render)(_react.default.createElement(Test, null)),
      unmount = _render4.unmount;

  unmount();
  expect(navigator.geolocation.clearWatch).toHaveBeenCalledWith('foo');
});