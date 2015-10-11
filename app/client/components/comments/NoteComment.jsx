C.NoteComment = React.createClass({
  mixins: [ReactMeteorData],
  propTypes: {
    noteId: React.PropTypes.string
  },
  getInitialState() {
    return {
      comment: ''
    }
  },
  getMeteorData() {
    return {
      user: Meteor.user()
    }
  },
  saveComment() {
    Comments.insert({
      text: this.state.comment,
      ownerId: this.data.user._id,
      noteId: this.props.noteId,
      createdAt: new Date()
    })
    this.refs.comment.getDOMNode().value = ''
  },
  handleChange(event) {
    this.setState({ comment: event.target.value })
  },
  render() {
    return (
      <div className="comment comment-input">
        <h6>New Comment</h6>
        <textarea ref="comment" onChange={this.handleChange} value={this.state.comment}></textarea>
        <C.CommentSaveButton saveComment={ this.saveComment }/>
      </div>
    )
  }
})
