C.NoteThumbnail = React.createClass({
  PropTypes: {
    showDetailView: React.PropTypes.func
  },
  showDetailView() {
    this.props.showDetailView(this.props.note)
  },
  render() {
    return (
      <div
        className="note-thumbnail"
        data-note={this.props.key}
        data-x={this.props.note.position.x}
        data-y={this.props.note.position.y}
        onClick={this.showDetailView}>
        <div className="title">
          {this.props.note.name}
        </div>
      </div>
    )
  }
})
