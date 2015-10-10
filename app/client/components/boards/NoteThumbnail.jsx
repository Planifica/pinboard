C.NoteThumbnail = React.createClass({
  render() {
    return (
      <div className="note-thumbnail">
        <div className="title">
          {this.props.note.name}
        </div>
      </div>
    )
  }
})
