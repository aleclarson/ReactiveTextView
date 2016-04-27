var Component, NativeValue, React, Reaction, ReactiveGetter, Style, TextView, Void, assert, objectify, ref, ref1, styleDiffer;

ref = require("component"), React = ref.React, Style = ref.Style, TextView = ref.TextView, Component = ref.Component, NativeValue = ref.NativeValue;

ref1 = require("type-utils"), Void = ref1.Void, assert = ref1.assert;

ReactiveGetter = require("ReactiveGetter");

styleDiffer = require("styleDiffer");

objectify = require("objectify");

Reaction = require("reaction");

module.exports = Component("ReactiveTextView", {
  propTypes: {
    text: [NativeValue, Void],
    getText: [Function.Kind, Void],
    style: Style
  },
  initProps: function(props) {
    return assert((props.text != null) || (props.getText != null), "Either 'text' or 'getText' must be defined in 'props'!");
  },
  initNativeValues: function() {
    return {
      text: this.props.text != null ? this.props.text : ReactiveGetter(this.props.getText)
    };
  },
  initListeners: function() {
    return this.text.didSet((function(_this) {
      return function() {
        try {
          return _this.forceUpdate();
        } catch (_error) {}
      };
    })(this));
  },
  shouldComponentUpdate: function(props) {
    return styleDiffer(props.style, this.props.style);
  },
  render: function() {
    return TextView({
      children: this.text.value || "",
      mixins: [
        objectify({
          keys: TextView.propTypes,
          values: this.props
        })
      ]
    });
  }
});

//# sourceMappingURL=../../map/src/ReactiveTextView.map
