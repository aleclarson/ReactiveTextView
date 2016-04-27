
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
    getText: [ Function.Kind, Void ]
    style: Style

  initProps: (props) ->
    assert props.text? or props.getText?, "Either 'text' or 'getText' must be defined in 'props'!"

  initNativeValues: ->

    text: if @props.text? then @props.text else ReactiveGetter @props.getText

  initListeners: ->

    @text.didSet =>
      try @forceUpdate()

  shouldComponentUpdate: (props) ->
    styleDiffer props.style, @props.style

  render: ->
    return TextView
      children: @text.value or ""
      mixins: [
        objectify
          keys: TextView.propTypes
          values: @props
      ]
