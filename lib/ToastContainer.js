'use strict';

var _omit2 = require('lodash/omit');

var _omit3 = _interopRequireDefault(_omit2);

var _includes2 = require('lodash/includes');

var _includes3 = _interopRequireDefault(_includes2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactAddonsUpdate = require('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _ToastMessage = require('./ToastMessage');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToastContainer = function (_React$Component) {
  _inherits(ToastContainer, _React$Component);

  function ToastContainer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ToastContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ToastContainer.__proto__ || Object.getPrototypeOf(ToastContainer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      toasts: [],
      toastId: 0,
      messageList: []
    }, _this.handleToastOnClick = function (event) {
      _this.props.onClick(event);
      if (event.defaultPrevented) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
    }, _this.handleToastRemove = function (toastId) {
      if (_this.props.preventDuplicates) {
        _this.state.previousMessage = '';
      }
      var operationName = '' + (_this.props.newestOnTop ? 'reduceRight' : 'reduce');
      _this.state.toasts[operationName](function (found, toast, index) {
        if (found || toast.toastId !== toastId) {
          return false;
        }
        _this.setState((0, _reactAddonsUpdate2.default)(_this.state, {
          toasts: { $splice: [[index, 1]] },
          messageList: { $splice: [[index, 1]] }
        }));
        return true;
      }, false);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ToastContainer, [{
    key: 'error',
    value: function error(message, title, optionsOverride) {
      this.notify(this.props.toastType.error, message, title, optionsOverride);
    }
  }, {
    key: 'info',
    value: function info(message, title, optionsOverride) {
      this.notify(this.props.toastType.info, message, title, optionsOverride);
    }
  }, {
    key: 'success',
    value: function success(message, title, optionsOverride) {
      this.notify(this.props.toastType.success, message, title, optionsOverride);
    }
  }, {
    key: 'warning',
    value: function warning(message, title, optionsOverride) {
      this.notify(this.props.toastType.warning, message, title, optionsOverride);
    }
  }, {
    key: 'clear',
    value: function clear() {
      var _this2 = this;

      /* eslint-disable react/no-string-refs */
      Object.keys(this.refs).forEach(function (key) {
        _this2.refs[key].hideToast(false);
      });
      /* eslint-enable react/no-string-refs */
    }
  }, {
    key: 'notify',
    value: function notify(type, message, title) {
      var _this3 = this;

      var optionsOverride = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      if (this.props.preventDuplicates) {
        if ((0, _includes3.default)(this.state.messageList, message)) {
          return;
        }
      }
      var key = this.state.toastId++; // eslint-disable-line no-plusplus
      var toastId = key;
      var newToast = (0, _reactAddonsUpdate2.default)(optionsOverride, {
        $merge: {
          type: type,
          title: title,
          message: message,
          toastId: toastId,
          key: key,
          ref: 'toasts__' + key,
          handleOnClick: function handleOnClick(e) {
            if (typeof optionsOverride.handleOnClick === 'function') {
              optionsOverride.handleOnClick();
            }
            return _this3.handleToastOnClick(e);
          },
          handleRemove: this.handleToastRemove
        }
      });
      var toastOperation = _defineProperty({}, '' + (this.props.newestOnTop ? '$unshift' : '$push'), [newToast]);

      var messageOperation = _defineProperty({}, '' + (this.props.newestOnTop ? '$unshift' : '$push'), [message]);

      var nextState = (0, _reactAddonsUpdate2.default)(this.state, {
        toasts: toastOperation,
        messageList: messageOperation
      });
      this.setState(nextState);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var divProps = (0, _omit3.default)(this.props, ['toastType', 'toastMessageFactory', 'preventDuplicates', 'newestOnTop']);

      return _react2.default.createElement(
        'div',
        _extends({}, divProps, { 'aria-live': 'polite', role: 'alert' }),
        this.state.toasts.map(function (toast) {
          return _this4.props.toastMessageFactory(toast);
        })
      );
    }
  }]);

  return ToastContainer;
}(_react2.default.Component);

ToastContainer.propTypes = {
  toastType: _propTypes2.default.shape({
    error: _propTypes2.default.string,
    info: _propTypes2.default.string,
    success: _propTypes2.default.string,
    warning: _propTypes2.default.string
  }).isRequired,
  toastMessageFactory: _propTypes2.default.func.isRequired,
  preventDuplicates: _propTypes2.default.bool.isRequired,
  newestOnTop: _propTypes2.default.bool.isRequired,
  onClick: _propTypes2.default.func.isRequired
};
ToastContainer.defaultProps = {
  toastType: {
    error: 'error',
    info: 'info',
    success: 'success',
    warning: 'warning'
  },
  id: 'toast-container',
  toastMessageFactory: _react2.default.createFactory(_ToastMessage.animation),
  preventDuplicates: true,
  newestOnTop: true,
  onClick: function onClick() {}
};


module.exports = ToastContainer;