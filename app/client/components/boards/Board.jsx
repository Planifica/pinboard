C.Board = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState: function() {
    return {
      sideBarVisible: false,
      sideBar: null
    }
  },
  getMeteorData() {
    let boardId = FlowRouter.getParam('boardId')
    let boardsHandle = Meteor.subscribe('boards', boardId)
    let notesHandle = Meteor.subscribe('notes', boardId)

    return {
      boardLoading: !boardsHandle.ready(),
      notesLoading: !notesHandle.ready(),
      notes: Notes.find({ boardId: boardId }, { sort: { 'position.y': 1 } }).fetch(),
      board: Boards.findOne({ _id: boardId }),
      mostOuterNote: Notes.find({ boardId: boardId }, { sort: { 'position.x': -1 }, limit: 1 }).fetch()[0]
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
  getAllNotes() {
    let notes = [],
      numberOfColumns = this.data && this.data.mostOuterNote && this.data.mostOuterNote.position.x || -1

    for (let i = 0; i <= numberOfColumns + 1; i++) {
      notes = notes.concat(this.getNotes(i))
    }

    return notes
  },
  showMemberView() {
    this.renderSideBar(<C.MembersView hideSideBar={this.hideSideBar}/>)
  },
  renderSideBar(component) {
    this.setState({
      sideBar: component
    })
  },
  hideSideBar() {
    this.renderSideBar(null)
  },
  addNote (position) {
    this.renderSideBar(<C.NoteDetailView key={position} note={ { position } } hideSideBar={this.hideSideBar}/>)
  },
  showDetailView (note) {
    this.renderSideBar(<C.NoteDetailView key={ note._id } note={note} hideSideBar={this.hideSideBar}/>)
  },
  renderNotesForColumn(column) {
    return this.getNotes(column).map((note) => {
      if (note.virtual) {
        return <C.NotePlaceholder note={note} addNote={this.addNote} />
      }

      return <C.NoteThumbnail key={note._id} note={note} notes={this.getAllNotes()} showDetailView={this.showDetailView} />
    })
  },
  renderColumns(numberOfColumns) {
    let columns = []

    for (let i = 0; i <= numberOfColumns + 1; i++) {
      columns.push(i)
    }

    return columns.map((column) => {

      return this.renderNotesForColumn(column)
    })
  },
  render() {
    // LOADING
    if (this.data.boardLoading) {
      return false
    }
    // MEMBER BUTTON
    let memberButton = (
      <C.IconButton icon="ion-ios-people" onClick={this.showMemberView} />
    )
    // BOARD
    if (this.data.notesLoading) {
      return <div>Loading ...</div>
    }

    let numberOfColumns = this.data && this.data.mostOuterNote && this.data.mostOuterNote.position ?
                    this.data.mostOuterNote.position.x : -1
    let boardName = (
      <h5>{this.data.board.name}</h5>
    )
    return (
      <div>
        <C.Toolbar
          left={boardName}
          right={memberButton}/>
        {this.state.sideBar ? this.state.sideBar : ''}
        <div className="container">
          <div className="note-container">
            {this.renderColumns(numberOfColumns)}
          </div>
        </div>
      </div>
    )
  },

  componentDidMount() {
    this.setState({
    })
  }
})
