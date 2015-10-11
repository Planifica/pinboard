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
  renderIcons() {
    let render
    if (this.props.icon) {
      render = (
        <i className={this.props.icon}></i>
      )
    }
    if (this.props.icons && this.props.icons.length > 0) {
      render = this.props.icons.map((icon) => {
        return (<i className={icon}></i>)
      })
    }
    return render
  },
  render () {
    const { propClassName } = this.props
    const className = propClassName || '' + 'button-icon'
    return (
        <button onClick={this.handleClick} className={className}>
          {this.renderIcons()}
        </button>
    )
  }
})
