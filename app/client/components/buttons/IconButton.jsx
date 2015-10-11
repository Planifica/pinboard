C.IconButton = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func,
    className: React.PropTypes.string,
    clickContext: React.PropTypes.object
  },
  handleClick() {
    if (this.props.onClick) {
      this.props.onClick(this.props.clickContext)
    }
  },
  render () {
    const { propClassName, clickContext } = this.props
    const className = propClassName || '' + 'button-icon'
    return (
        <button onClick={this.handleClick} className={className}>
            <i className={this.props.icon}></i>
        </button>
    )
  }
})
