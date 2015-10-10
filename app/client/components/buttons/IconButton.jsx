C.IconButton = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func
  },
  render () {
    const { onClick } = this.props
    return (
        <button class="button" onClick={onClick}>
            <i className={this.props.icon}></i>
        </button>
    )
  }
})
