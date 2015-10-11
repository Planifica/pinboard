C.NotePlaceholder = React.createClass({
  PropTypes: {
    addNote: React.PropTypes.func
  },
  addNote() {
    this.props.addNote(this.props.note.position)
  },
  render() {
    return (
      <div
        className="note-placeholder"
        data-x={this.props.note.position.x}
        data-y={this.props.note.position.y}
        onClick={this.addNote}
        >
        <i className="ion-ios-plus-empty"></i>
      </div>
    )
  }
})
