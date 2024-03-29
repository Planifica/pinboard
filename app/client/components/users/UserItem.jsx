C.UserItem = React.createClass({
  PropTypes: {
    user: React.PropTypes.object,
    handlePrimaryClick: React.PropTypes.func
  },
  renderAvatar () {
    let url = ''
    let email = this.props.user.emails[0].address
    if (email) {
      url = Gravatar.imageUrl(email, {
        size: 34,
        default: 'mm'
      })
    }
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
            { this.props.user.emails[0].address }
          </span>
        </div>
        <div>
          {this.props.actionItem}
        </div>
      </div>
    )
  }
})
