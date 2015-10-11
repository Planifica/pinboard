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
  renderComments () {
    if (this.data.comments.length === 0) {
      return 'No comments yet'
    }
    return this.data.comments.map((comment) => {
      return <C.UserItemWithComment user={this.data.user} comment={comment.text}/>
    })
  },
  render() {
    // LOADING
    if (this.data.commentsHandle) {
      return false
    }

    return (
      <div className="comments">
        <h6>Comments</h6>
        {this.renderComments()}
      </div>
    )
  }
})
