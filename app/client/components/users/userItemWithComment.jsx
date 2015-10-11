C.UserItemWithComment = React.createClass({
  mixins: [ReactMeteorData],
  PropTypes: {
    user: React.PropTypes.object,
    handlePrimaryClick: React.PropTypes.func,
    comment: React.PropTypes.string
  },
  getMeteorData() {
    let userHandle = Meteor.subscribe('users', [this.props.user])
    return {
      userReady: userHandle.ready(),
      user: Meteor.users.findOne({ _id: this.props.user })
    }
  },
  renderAvatar () {
    let render = (
      <div className="circle"></div>
    )
    return render
  },
  handlePrimaryClick() {
    if (this.props.handlePrimaryClick) {
      this.props.handlePrimaryClick(this.props.user)
    }
  },
  render () {
    let render
    if (this.data.userReady) {
      render = (
        <div className="user-item" onClick={this.handlePrimaryClick}>
          <div className="avatar">
            {this.renderAvatar()}
          </div>
          <div>
            <span className="primary">@{this.data.user.username}</span>
            <span className="secondary">
              { this.props.comment }
            </span>
          </div>
          <div>
            {this.props.actionItem}
          </div>
        </div>
      )
    } else {
      render = (
        <div>Loading...</div>
      )
    }
    return render
  }
})
