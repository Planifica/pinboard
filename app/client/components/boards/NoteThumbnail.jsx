C.NoteThumbnail = React.createClass({
  render() {
    return (
      <div className="note-thumbnail" data-note={this.props.key}
           data-x={this.props.note.position.x} data-y={this.props.note.position.y}>
        <div className="title">
          {this.props.note.name}
        </div>
      </div>
    )
  }
})
