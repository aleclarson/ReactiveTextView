
{ Style
  TextView
  Component
  NativeValue } = require "component"

ReactiveGetter = require "ReactiveGetter"
objectify = require "objectify"
assert = require "assert"
Maybe = require "Maybe"

type = Component "ReactiveTextView"

type.propTypes =
  text: NativeValue.Maybe
  getText: Maybe(Function.Kind)
  style: Style

type.initProps (props) ->
  assert props.text? or props.getText?, ->
    reason: "Either 'text' or 'getText' must be defined in 'props'!"

type.defineNativeValues

  text: ->
    @props.text or
    ReactiveGetter @props.getText

type.defineListeners ->

  @text.didSet =>
    try @forceUpdate()

type.render ->

  props = objectify
    keys: TextView.propTypes
    values: @props

  props.children = @text.value or ""

  TextView props

module.exports = type.build()
