C.IconButton = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func,
    className: React.PropTypes.string
  },
  render () {
    const { onClick, className } = this.props
    return (
        <button class="button" onClick={onClick} className={className}>
            <i className={this.props.icon}></i>
        </button>
    )
  }
})
