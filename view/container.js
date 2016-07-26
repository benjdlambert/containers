'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (ReactClass, dataRequirements) {
    return function (_React$Component) {
        _inherits(_class, _React$Component);

        function _class(props) {
            _classCallCheck(this, _class);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, props));

            _this.state = {
                data: {},
                dataRequirements: dataRequirements.data(props)
            };

            _this.populateData = _this.populateData.bind(_this);
            return _this;
        }

        _createClass(_class, [{
            key: 'componentWillMount',
            value: function componentWillMount() {
                this.populateData();
            }
        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.pollForChanges();
            }
        }, {
            key: 'makeRequestAndSetState',
            value: function makeRequestAndSetState(URL) {
                return fetch(URL).then(function (response) {
                    return response.json();
                }).then(function (response) {
                    return ServerState[URL] = response;
                });
            }
        }, {
            key: 'populateData',
            value: function populateData() {
                var _this2 = this;

                Object.keys(this.state.dataRequirements).forEach(function (key) {
                    var URL = _this2.state.dataRequirements[key];
                    if (!ServerState[URL]) {
                        _this2.makeRequestAndSetState(URL).then(function () {
                            return _this2.populateData();
                        });
                    } else {
                        _this2.state.data[key] = ServerState[URL];
                    }
                });
            }
        }, {
            key: 'pollForChanges',
            value: function pollForChanges() {
                var _this3 = this;

                Object.keys(this.state.dataRequirements).forEach(function (key) {
                    var URL = _this3.state.dataRequirements[key];
                    setInterval(function () {
                        _this3.makeRequestAndSetState(URL).then(function () {
                            return _this3.populateData();
                        }).then(function () {
                            return _this3.forceUpdate();
                        });
                    }, 1000);
                });
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2.default.createElement(ReactClass, this.state);
            }
        }]);

        return _class;
    }(_react2.default.Component);
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = exports['default'];
