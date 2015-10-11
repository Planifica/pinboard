C.NoteThumbnail = React.createClass({
  getInitialState() {
    return {
      x: this.props.note.position.x,
      y: this.props.note.position.y
    }
  },
  PropTypes: {
    showDetailView: React.PropTypes.func
  },
  showDetailView() {
    this.props.showDetailView(this.props.note)
  },
  renderText () {
    if(this.props.note.text){
      const markdown = { __html: marked(this.props.note.text, { sanitize: true }) }
      return (<div className="markdown">
        <p
        dangerouslySetInnerHTML={markdown}
        />
        </div>
      )
    }
  },
  render() {
    let style = {
      WebkitTransform: 'translate(' + this.state.x * 170 + 'px,' + this.state.y * 170 + 'px)',
      transform: 'translate(' + this.state.x * 170 + 'px,' + this.state.y * 170 + 'px)'
    }

    return (
      <div className="note-thumbnail" data-note={this.props.note._id} style={style} onClick={this.showDetailView}>
        <p className="title">
          {this.props.note.name}
        </p>
        <p className="text">
          {this.renderText()}
        </p>
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

  pushWithFollowingNotes(note) {
    let next,
      x, y

    if (note && !note.virtual) {
      x = note.position.x
      y = note.position.y

      if (y === 2) {
        next = this.getNoteAtPosition(x + 1, 0)
        note.position.x = x + 1
        note.position.y = 0
        Notes.update({ _id: note._id }, { $set: { 'position.x': x + 1, 'position.y': 0 } })
      } else {
        next = this.getNoteAtPosition(x, y + 1)
        note.position.y = y + 1
        Notes.update({ _id: note._id }, { $set: { 'position.y': y + 1 } })
      }
      this.pushWithFollowingNotes(next)
    }
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
            } else {
              that.pushWithFollowingNotes(replacedNote)
              that.storeNotePosition(that.props.note, x, y)
            }
          }

        }
      })
  }
})
