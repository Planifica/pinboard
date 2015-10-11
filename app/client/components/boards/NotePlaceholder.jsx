C.NotePlaceholder = React.createClass({
  render() {
    return (
      <div className="note-placeholder" data-x={this.props.note.position.x} data-y={this.props.note.position.y}>
        <i className="ion-ios-plus-empty"></i>
      </div>
    )
  }
})
