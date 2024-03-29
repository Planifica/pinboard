C.NotePlaceholder = React.createClass({
  PropTypes: {
    addNote: React.PropTypes.func
  },
  addNote() {
    this.props.addNote(this.props.note.position)
  },
  render() {
    let style = {
      WebkitTransform: 'translate(' + this.props.note.position.x * 170 + 'px,' +
      this.props.note.position.y * 170 + 'px)',
      transform: 'translate(' + this.props.note.position.x * 170 + 'px,' + this.props.note.position.y * 170 + 'px)'
    }

    let animationCss = this.props.notes.length === 0 ? 'animate-flicker' : ''

    return (
      <div
        className={'note-placeholder ' + animationCss}
        style={style}
        onClick={this.addNote}
        >
        <i className="ion-ios-plus-empty"></i>
      </div>
    )
  }
})
