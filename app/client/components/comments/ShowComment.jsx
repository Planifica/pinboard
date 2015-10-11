C.ShowComment = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let commentsHandle = Meteor.subscribe('comments', this.props.noteId)

    return {
      commentsHandle: !commentsHandle.ready(),
      comments: Comments.find({ noteId: this.props.noteId }).fetch(),
      user: Meteor.user()
    }
  },
  render() {
    // LOADING
    if (this.data.commentsHandle) {
      return false
    }

    let comments = (
      this.data.comments.map((comment) => {
        return <C.UserItemWithComment user={this.data.user} comment={comment.text}/>
      })
    )

    return (
      <div>
        {comments}
      </div>
    )
  }
})
