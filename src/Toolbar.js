import PropTypes from 'prop-types'
import React from 'react'
import cn from 'classnames'
import { navigate } from './utils/constants'

class Toolbar extends React.Component {
  static propTypes = {
    view: PropTypes.string.isRequired,
    views: PropTypes.arrayOf(PropTypes.string).isRequired,
    label: PropTypes.node.isRequired,
    previousLabel: PropTypes.object,
    currentLabel: PropTypes.object,
    nextLabel: PropTypes.object,
    localizer: PropTypes.object,
    onNavigate: PropTypes.func.isRequired,
    onView: PropTypes.func.isRequired,
  }

  render() {
    let {
      localizer: { messages },
      label,
      previousLabel,
      currentLabel,
      nextLabel,
      view,
    } = this.props

    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group view-day">
          {view === 'day' ? (
            <div onClick={this.navigate.bind(null, navigate.PREVIOUS)}>
              <span>{previousLabel.number}</span>
              <span className="number-wrapper">
                <span>{previousLabel.name}</span>
              </span>
            </div>
          ) : (
            <button
              type="button"
              onClick={this.navigate.bind(null, navigate.PREVIOUS)}
            >
              {messages.previous}
            </button>
          )}
          {view === 'day' ? (
            <div onClick={this.navigate.bind(null, navigate.TODAY)}>
              <span>{currentLabel.number}</span>
              <span className="number-wrapper -current">
                <span>{currentLabel.name}</span>
              </span>
            </div>
          ) : (
            <button
              type="button"
              onClick={this.navigate.bind(null, navigate.TODAY)}
            >
              {label}
            </button>
          )}
          {view === 'day' ? (
            <div onClick={this.navigate.bind(null, navigate.NEXT)}>
              <span>{nextLabel.number}</span>
              <span className="number-wrapper">
                <span>{nextLabel.name}</span>
              </span>
            </div>
          ) : (
            <button
              type="button"
              onClick={this.navigate.bind(null, navigate.NEXT)}
            >
              {messages.next}
            </button>
          )}
        </span>

        <span className="rbc-toolbar-label">{label}</span>

        <span className="rbc-btn-group view-names">
          {this.viewNamesGroup(messages)}
        </span>
      </div>
    )
  }

  navigate = action => {
    this.props.onNavigate(action)
  }

  view = view => {
    this.props.onView(view)
  }

  viewNamesGroup(messages) {
    let viewNames = this.props.views
    const view = this.props.view

    if (viewNames.length > 1) {
      return viewNames.map(name => (
        <button
          type="button"
          key={name}
          className={cn({ 'rbc-active': view === name })}
          onClick={this.view.bind(null, name)}
        >
          {messages[name]}
        </button>
      ))
    }
  }
}

export default Toolbar
