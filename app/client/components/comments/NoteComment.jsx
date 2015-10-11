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
  },
  handleChange(event) {
    this.setState({ comment: event.target.value })
  },
  render() {
    return (
      <div>
        <textarea onChange={this.handleChange} value={this.state.comment}></textarea>
        <C.CommentSaveButton saveComment={ this.saveComment }/>
      </div>
    )
  }
})
