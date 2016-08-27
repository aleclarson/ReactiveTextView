var Component, NativeValue, ReactiveGetter, Style, TextView, objectify, ref, type;

ref = require("modx"), Component = ref.Component, Style = ref.Style;

NativeValue = require("modx/native").NativeValue;

TextView = require("modx/views").TextView;

ReactiveGetter = require("ReactiveGetter");

objectify = require("objectify");

type = Component("ReactiveTextView");

type.defineProps({
  text: NativeValue,
  getText: Function.Kind,
  style: Style
});

type.initProps(function(props) {
  if (!((props.text != null) || (props.getText != null))) {
    throw Error("Either 'text' or 'getText' must be defined in 'props'!");
  }
});

type.defineValues({
  textProps: function() {
    return objectify({
      keys: TextView.propTypes,
      values: this.props
    });
  }
});

type.defineNativeValues(function() {
  return {
    text: this.props.text || ReactiveGetter(this.props.getText)
  };
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
  return TextView(this.textProps, this.text.value || "");
});

module.exports = type.build();

//# sourceMappingURL=map/ReactiveTextView.map
