
{Component, Style} = require "modx"
{NativeValue} = require "modx/native"
{TextView} = require "modx/views"

objectify = require "objectify"

type = Component "ReactiveTextView"

type.defineProps
  text: NativeValue
  getText: Function
  style: Style

type.initProps (props) ->
  unless props.text? or props.getText?
    throw Error "Either 'text' or 'getText' must be defined in 'props'!"

type.defineValues

  textProps: -> objectify
    keys: TextView.propTypes
    values: @props

type.defineNativeValues ->

  text: @props.text or
    ReactiveGetter @props.getText

type.defineMountedListeners ->

  @text.didSet =>
    try @forceUpdate()

type.render ->
  TextView @textProps, @text.value or ""

module.exports = type.build()
