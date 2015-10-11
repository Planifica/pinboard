C.Tag = React.createClass({
  propTypes: {
    tag: React.PropTypes.object,
    handleClick: React.PropTypes.func
  },
  handleRemove () {
    this.props.handleRemove(this.props.tag)
  },
  render () {
    return (
      <div className="tag">
        <span>{this.props.tag.name}</span>
        <i className="ion-ios-close-empty" onClick={this.handleRemove}></i>
      </div>
    )
  }
})
