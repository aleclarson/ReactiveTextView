
{Component, Style} = require "modx"
{TextView} = require "modx/views"

objectify = require "objectify"

type = Component "ReactiveTextView"

type.defineProps
  text: Function.isRequired
  style: Style

type.defineValues

  textProps: -> objectify
    keys: TextView.propTypes
    values: @props

type.defineNativeValues ->

  text: @props.text

type.defineListeners ->

  @text.didSet =>
    try @forceUpdate()

type.render ->
  TextView @textProps, @text.value or ""

module.exports = type.build()
