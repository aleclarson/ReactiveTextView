
{ React
  Style
  TextView
  Component
  NativeValue } = require "component"

{ Void
  assert } = require "type-utils"

ReactiveGetter = require "ReactiveGetter"
styleDiffer = require "styleDiffer"
objectify = require "objectify"
Reaction = require "reaction"

module.exports = Component "ReactiveTextView",

  propTypes:
    text: [ NativeValue, Void ]
    getText: [ ReactiveGetter, Void ]
    style: Style

  initProps: (props) ->
    assert props.getText or props.text,
      reason: "Either 'text' or 'getText' must be defined!"
      component: this

  initNativeValues: ->

    text: @props.getText or @props.text.getValue

  componentDidMount: ->
    @text.addListener "didSet", (event) =>
      @forceUpdate()

  shouldComponentUpdate: (props) ->
    styleDiffer props.style, @props.style

  render: ->
    return TextView
      children: @text.value or ""
      mixins: [
        objectify
          keys: React.Text.propTypes
          values: @props
      ]
