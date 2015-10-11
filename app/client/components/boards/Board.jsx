C.Board = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState: function() {
    return {
      sideRightVisible: false,
      sideRightContentString: '',
      sideRightContent: '',
      sideRightClassName: ''
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
  show: function() {
    this.setState({ sideRightVisible: true })
  },
  hide: function() {
    this.setState({ sideRightVisible: false })

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
  toggleSideMember() {
    if (this.state.sideRightVisible === true) {
      this.hide()
      this.setState({ sideRightContentString: '' })
      this.setState({ sideRightClassName: '' })
    } else {
      this.setState({ sideRightContent: this.renderMembers() })
      this.setState({ sideRightContentString: 'members' })
      this.setState({ sideRightClassName: 'menu-right' })
      this.show()
    }

  },
  renderMembers() {
    return <C.Members />
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
    // LOADING
    if (this.data.boardLoading) {
      return false
    }
    // MEMBER BUTTON
    let memberButton = (
      <C.IconButton icon="ion-ios-people" onClick={this.toggleSideMember} />
    )
    // SIDE RIGHT
    let sideRight
    let toolbarRightIconButtons
    if (this.state.sideRightContentString === 'task') {
      toolbarRightIconButtons = (
        <div>
          <C.IconButton icon="ion-ios-trash-outline" toolbarLeftClassName="toolbar-right-icon" onClick={this.renderSearchHeader} />
          <C.IconButton icon="ion-android-create" toolbarLeftClassName="toolbar-right-icon" onClick={this.renderSearchHeader} />
          <C.IconButton icon="ion-ios-close-empty" className="toolbar-right-icon" onClick={this.hide} />
        </div>
      )
    } else {
      toolbarRightIconButtons = (
        <div>
          <C.IconButton icon="ion-ios-close-empty" className="toolbar-right-icon" onClick={this.hide} />
        </div>
      )
    }

    if (this.state.sideRightVisible === true) {
      sideRight = (
        <C.SideRight className={this.state.sideRightClassName}
        content={this.state.sideRightContent}
        toolbarRight={toolbarRightIconButtons}/>
      )
    }
    // BOARD
    if (this.data.notesLoading) {
      return <div>Loading ...</div>
    }

    let numberOfColumns = this.data.mostOuterNote.position.x

    return (
      <div>
        <C.Toolbar left={this.data.board.name} right={memberButton}/>
        {sideRight}
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
