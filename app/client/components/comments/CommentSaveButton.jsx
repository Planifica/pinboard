C.CommentSaveButton = React.createClass({
  getMeteorData() {
    return {
      user: Meteor.user()
    }
  },
  render() {
    return (
      <div>
        <button className="" onClick={ this.props.saveComment }>
          {TAPi18n.__('commentSave')}
        </button>
      </div>
    )
  }
})
