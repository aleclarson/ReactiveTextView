var Component, Maybe, NativeValue, ReactiveGetter, Style, TextView, assert, objectify, ref, type;

ref = require("component"), Style = ref.Style, TextView = ref.TextView, Component = ref.Component, NativeValue = ref.NativeValue;

ReactiveGetter = require("ReactiveGetter");

objectify = require("objectify");

assert = require("assert");

Maybe = require("Maybe");

type = Component("ReactiveTextView");

type.propTypes = {
  text: NativeValue.Maybe,
  getText: Maybe(Function.Kind),
  style: Style
};

type.initProps(function(props) {
  return assert((props.text != null) || (props.getText != null), function() {
    return {
      reason: "Either 'text' or 'getText' must be defined in 'props'!"
    };
  });
});

type.defineNativeValues({
  text: function() {
    return this.props.text || ReactiveGetter(this.props.getText);
  }
});

type.defineListeners(function() {
  return this.text.didSet((function(_this) {
    return function() {
      try {
        return _this.forceUpdate();
      } catch (error) {}
    };
  })(this));
});

type.render(function() {
  var props;
  props = objectify({
    keys: TextView.propTypes,
    values: this.props
  });
  props.children = this.text.value || "";
  return TextView(props);
});

module.exports = type.build();

//# sourceMappingURL=../../map/src/ReactiveTextView.map
