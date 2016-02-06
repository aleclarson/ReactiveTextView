var Component, NativeValue, React, Reaction, ReactiveGetter, Style, TextView, Void, assert, objectify, ref, ref1, styleDiffer;

ref = require("component"), React = ref.React, Style = ref.Style, TextView = ref.TextView, Component = ref.Component, NativeValue = ref.NativeValue;

ref1 = require("type-utils"), Void = ref1.Void, assert = ref1.assert;

ReactiveGetter = require("reactive-getter");

styleDiffer = require("styleDiffer");

objectify = require("objectify");

Reaction = require("reaction");

module.exports = Component("ReactiveTextView", {
  propTypes: {
    text: [NativeValue, Void],
    getText: [ReactiveGetter, Void],
    style: Style
  },
  initProps: function(props) {
    return assert(props.getText || props.text, {
      reason: "Either 'text' or 'getText' must be defined!",
      component: this
    });
  },
  initNativeValues: function() {
    return {
      text: this.props.getText || this.props.text.getValue
    };
  },
  componentDidMount: function() {
    return this.text.addListener((function(_this) {
      return function(event) {
        if (event === "didSet") {
          return _this.forceUpdate();
        }
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
          keys: React.Text.propTypes,
          values: this.props
        })
      ]
    });
  }
});

//# sourceMappingURL=../../map/src/ReactiveTextView.map
