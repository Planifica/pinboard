let drake

C.Board = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let handle = Meteor.subscribe('notes')

    return {
      notesLoading: !handle.ready(),
      notes: Notes.find({}, { sort: { 'position.y': 1 } }).fetch(),
      mostOuterNote: Notes.find({}, { sort: { 'position.x': -1 }, limit: 1 }).fetch()[0]
    }
  },

  noteWithPosition(notes, x, y) {
    return notes.filter((note) => {
      return note.position.x === x && note.position.y === y
    })[0]
  },

  getNotes() {
    let lastColumn = this.data.mostOuterNote && this.data.mostOuterNote.position.x,
      notes = [],
      realNotes = this.data.notes

    for (let i = 0; i <= lastColumn + 1; i++) {
      for (let j = 0; j <= 2; j++) {
        let realNode = this.noteWithPosition(realNotes, i, j)

        if (!realNode) {
          let virtualNode = {
            virtual: true,
            position: {
              x: i,
              y: j
            }
          }
          notes.push(virtualNode)
        } else {
          notes.push(realNode)
        }
      }
    }

    return notes
  },

  renderNotesForColumn(column) {
    return this.getNotes().filter((note) => {
      return note.position.x === column
    }).map((note) => {
      console.log(note.position)
      if (note.virtual) {
        return <C.NotePlaceholder />
      }

      return <C.NoteThumbnail key={note._id} note={note} />
    })
  },

  renderColumns(numberOfColumns) {
    let columns = []

    for (let i = 0; i <= numberOfColumns + 1; i++) {
      columns.push(i)
    }

    return columns.map((column) => {
      let containerName = 'dragContainer' + column
      let container = (
        <div className="note-column" ref={containerName}>
          {this.renderNotesForColumn(column)}
        </div>
      )

      drake.containers.push(container)

      return container
    })
  },

  render() {
    if (this.data.notesLoading) {
      return <div>Loading ...</div>
    }

    let numberOfColumns = this.data.mostOuterNote.position.x

    return (
      <div className="container">
        <h5>{TAPi18n.__('yourNotes')}</h5>
        <div className="note-columns">
          {this.renderColumns(numberOfColumns)}
        </div>
      </div>
    )
  },

  componentDidMount() {
    drake = reactDragula()
  }
})
