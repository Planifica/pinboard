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
      notes: Notes.find({}, { sort: { 'position.y': 1 } }).fetch(),
      board: Boards.findOne({ _id: boardId }),
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
    this.renderSideBar(<C.NoteDetailView note={position}/>)
  },
  renderColumns(numberOfColumns) {
    let columns = []

    for (let i = 0; i <= numberOfColumns + 1; i++) {
      columns.push(i)
    }

    return columns.map((column) => {

      return <C.BoardColumn
        column={column}
        notes={this.getNotes(column)}
        drake={this.state.drake}
        addNote={this.addNote}/>
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

    let numberOfColumns = this.data && this.data.mostOuterNote && this.data.mostOuterNote.position.x || -1

    return (
      <div>
        <C.Toolbar left={this.data.board.name} right={memberButton}/>
        {this.state.sideBar ? this.state.sideBar : ''}
        <div className="container">
          <h5>{TAPi18n.__('yourNotes')}</h5>
          <div className="note-columns">
            {this.renderColumns(numberOfColumns)}
          </div>
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
