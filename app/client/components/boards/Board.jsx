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

  getNotes(column) {
    let notes = [],
      realNotes = this.data.notes

    for (let j = 0; j <= 2; j++) {
      let realNode = this.noteWithPosition(realNotes, column, j)

      if (!realNode) {
        let virtualNode = {
          virtual: true,
          position: {
            x: column,
            y: j
          }
        }
        notes.push(virtualNode)
      } else {
        notes.push(realNode)
      }
    }

    return notes
  },

  renderColumns(numberOfColumns) {
    let columns = []

    for (let i = 0; i <= numberOfColumns + 1; i++) {
      columns.push(i)
    }

    return columns.map((column) => {

      return <C.BoardColumn column={column} notes={this.getNotes(column)} drake={this.state.drake} />
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
    this.setState({
      drake: reactDragula({
        invalid(el) {
          return el.className === 'note-placeholder'
        }
      })
    })
  }
})
