C.IconButton = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func,
    className: React.PropTypes.string
  },
  render () {
    const { onClick, propClassName } = this.props
    const className = propClassName || '' + 'button-icon'
    return (
        <button onClick={onClick} className={className}>
            <i className={this.props.icon}></i>
        </button>
    )
  }
})
