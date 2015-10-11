C.NoteThumbnail = React.createClass({
  getInitialState() {
    return {
      x: this.props.note.position.x,
      y: this.props.note.position.y
    }
  },
  render() {
    let style = {
      WebkitTransform: 'translate(' + this.state.x * 170 + 'px,' + this.state.y * 170 + 'px)',
      transform: 'translate(' + this.state.x * 170 + 'px,' + this.state.y * 170 + 'px)'
    }

    return (
      <div className="note-thumbnail" data-note={this.props.note._id} style={style}>
        <div className="title">
          {this.props.note.name}
        </div>
      </div>
    )
  },

  getNoteAtPosition(x, y) {
    let filteredNotes,
      notes = this.props.notes

    filteredNotes = notes.filter((note) => {
      return note.position.x === x && note.position.y === y
    })

    return filteredNotes.length > 0 && filteredNotes[0]
  },

  storeNotePosition(note, x, y) {
    Notes.update({ _id: note._id }, { $set: { 'position.x': x, 'position.y': y } })
  },

  componentDidMount() {
    let element = React.findDOMNode(this),
      that = this

    function dragMoveListener (event) {
      let target = event.target,
        updatedX,
        updatedY,
        x = (that.state.x || 0) * 170 + event.dx,
        y = (that.state.y || 0) * 170 + event.dy

      updatedX = x / 170
      updatedY = y / 170

      target.style.zIndex = 20000
      // translate the element
      target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

      that.setState({
        x: updatedX,
        y: updatedY
      })
    }

    interact(element)
      .draggable({
        snap: {
          targets: [
            interact.createSnapGrid({ x: 170, y: 170 })
          ],
          range: Infinity
        },
        autoScroll: true,
        onmove: dragMoveListener,
        onend: function() {
          let x = that.state.x,
            y = that.state.y

          let replacedNote = that.getNoteAtPosition(x, y)

          if (replacedNote) {
            if (replacedNote.virtual) {
              that.storeNotePosition(that.props.note, x, y)
            }
          }

        }
      })
  }
})
