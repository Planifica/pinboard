C.UserItemWithComment = React.createClass({
  PropTypes: {
    user: React.PropTypes.object,
    handlePrimaryClick: React.PropTypes.func,
    comment: React.PropTypes.string,
    email: React.PropTypes.string
  },
  renderAvatar () {
    let url = Gravatar.imageUrl(this.props.email, {
      size: 34,
      default: 'mm'
    })
    let render = (
      <div className="circle"><img className="circle" src={url}/></div>
    )
    return render
  },
  handlePrimaryClick() {
    if (this.props.handlePrimaryClick) {
      this.props.handlePrimaryClick(this.props.user)
    }
  },
  render () {
    return (
      <div className="user-item" onClick={this.handlePrimaryClick}>
        <div className="avatar">
          {this.renderAvatar()}
        </div>
        <div>
          <span className="primary">@{this.props.user.username}</span>
          <span className="secondary">
            { this.props.comment }
          </span>
        </div>
        <div>
          {this.props.actionItem}
        </div>
      </div>
    )
  }
})
