'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function callShowMethod($node, props) {
  $node[props.showMethod]({
    duration: props.showDuration,
    easing: props.showEasing
  });
}

exports.default = {
  getDefaultProps: function getDefaultProps() {
    return {
      style: {
        display: 'none' // effective $.hide()
      },
      showMethod: 'fadeIn', // slideDown, and show are built into jQuery
      showDuration: 300,
      showEasing: 'swing', // and linear are built into jQuery
      hideMethod: 'fadeOut',
      hideDuration: 1000,
      hideEasing: 'swing',
      //
      timeOut: 5000,
      extendedTimeOut: 1000
    };
  },
  getInitialState: function getInitialState() {
    return {
      intervalId: null,
      isHiding: false
    };
  },
  componentDidMount: function componentDidMount() {
    callShowMethod(this.getNode(), this.props);
    if (this.props.timeOut > 0) {
      this.setIntervalId(setTimeout(this.hideToast, this.props.timeOut));
    }
  },
  handleMouseEnter: function handleMouseEnter() {
    clearTimeout(this.state.intervalId);
    this.setIntervalId(null);
    this.setIsHiding(false);

    callShowMethod(this.getNode().stop(true, true), this.props);
  },
  handleMouseLeave: function handleMouseLeave() {
    if (!this.state.isHiding && (this.props.timeOut > 0 || this.props.extendedTimeOut > 0)) {
      this.setIntervalId(setTimeout(this.hideToast, this.props.extendedTimeOut));
    }
  },
  hideToast: function hideToast(override) {
    if (this.state.isHiding || this.state.intervalId === null && !override) {
      return;
    }
    this.setState({ isHiding: true });

    this.getNode()[this.props.hideMethod]({
      duration: this.props.hideDuration,
      easing: this.props.hideEasing,
      complete: this.handleRemove
    });
  },
  getNode: function getNode() {
    /* eslint-disable no-undef */
    return jQuery(_reactDom2.default.findDOMNode(this));
    /* eslint-enable no-undef */
  },
  setIntervalId: function setIntervalId(intervalId) {
    this.setState({
      intervalId: intervalId
    });
  },
  setIsHiding: function setIsHiding(isHiding) {
    this.setState({
      isHiding: isHiding
    });
  }
};