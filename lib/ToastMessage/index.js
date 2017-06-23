'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jQuery = exports.animation = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsUpdate = require('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _animationMixin = require('./animationMixin');

var _animationMixin2 = _interopRequireDefault(_animationMixin);

var _jQueryMixin = require('./jQueryMixin');

var _jQueryMixin2 = _interopRequireDefault(_jQueryMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function noop() {}

var ToastMessageSpec = {
  displayName: 'ToastMessage',

  getDefaultProps: function getDefaultProps() {
    var iconClassNames = {
      error: 'toast-error',
      info: 'toast-info',
      success: 'toast-success',
      warning: 'toast-warning'
    };

    return {
      className: 'toast',
      iconClassNames: iconClassNames,
      titleClassName: 'toast-title',
      messageClassName: 'toast-message',
      tapToDismiss: true,
      closeButton: false
    };
  },
  handleOnClick: function handleOnClick(event) {
    this.props.handleOnClick(event);
    if (this.props.tapToDismiss) {
      this.hideToast(true);
    }
  },
  handleCloseButtonClick: function handleCloseButtonClick(event) {
    event.stopPropagation();
    this.hideToast(true);
  },
  handleRemove: function handleRemove() {
    this.props.handleRemove(this.props.toastId);
  },
  renderCloseButton: function renderCloseButton() {
    return this.props.closeButton ?
    /* eslint-disable react/no-danger */
    _react2.default.createElement('button', {
      className: 'toast-close-button',
      onClick: this.handleCloseButtonClick,
      dangerouslySetInnerHTML: { __html: '&times;' }
    })
    /* eslint-enable react/no-danger */
    : false;
  },
  renderTitleElement: function renderTitleElement() {
    return this.props.title ? _react2.default.createElement(
      'div',
      { className: this.props.titleClassName },
      this.props.title
    ) : false;
  },
  renderMessageElement: function renderMessageElement() {
    return this.props.message ? _react2.default.createElement(
      'div',
      { className: this.props.messageClassName },
      this.props.message
    ) : false;
  },
  render: function render() {
    var iconClassName = this.props.iconClassName || this.props.iconClassNames[this.props.type];

    return (
      /* eslint-disable jsx-a11y/no-static-element-interactions */
      _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)(this.props.className, iconClassName),
          style: this.props.style,
          onClick: this.handleOnClick,
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave
        },
        this.renderCloseButton(),
        this.renderTitleElement(),
        this.renderMessageElement()
      )
      /* eslint-enable jsx-a11y/no-static-element-interactions */

    );
  }
};

var animation = exports.animation = (0, _createReactClass2.default)((0, _reactAddonsUpdate2.default)(ToastMessageSpec, {
  displayName: { $set: 'ToastMessage.animation' },
  mixins: { $set: [_animationMixin2.default] }
}));

var jQuery = exports.jQuery = (0, _createReactClass2.default)((0, _reactAddonsUpdate2.default)(ToastMessageSpec, {
  displayName: { $set: 'ToastMessage.jQuery' },
  mixins: { $set: [_jQueryMixin2.default] }
}));

/*
 * assign default noop functions
 */
ToastMessageSpec.handleMouseEnter = noop;
ToastMessageSpec.handleMouseLeave = noop;
ToastMessageSpec.hideToast = noop;

var ToastMessage = _react2.default.createClass(ToastMessageSpec);

ToastMessage.animation = animation;
ToastMessage.jQuery = jQuery;

exports.default = ToastMessage;