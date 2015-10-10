C.Board = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let boardId = FlowRouter.getParam('boardId')
    let handle = Meteor.subscribe('boards', boardId)
    return {
      boardLoading: !handle.ready(),
      board: Boards.findOne({ _id: boardId })
    }
  },
  getInitialState: function() {
    return {
      sideRightVisible: false,
      sideRightContentString: '',
      sideRightContent: '',
      sideRightClassName: ''
    }
  },
  show: function() {
    this.setState({ sideRightVisible: true })
  },

  hide: function() {
    this.setState({ sideRightVisible: false })
  },
  getNotes() {
    return [
      { _id: 1, title: 'This is task 1' },
      { _id: 2, title: 'This is task 2' },
      { _id: 3, title: 'This is task 3' },
      { _id: 4, title: 'This is task 4' },
      { _id: 5, title: 'This is task 5' },
      { _id: 6, title: 'This is task 6' },
      { _id: 7, title: 'This is task 7' },
      { _id: 8, title: 'This is task 8' },
      { _id: 9, title: 'This is task 9' }
    ]
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
  renderNotes() {
    return this.getNotes().map((note) => {
      return <C.NoteThumbnail key={note._id} note={note} />
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
    return (
      <div>
        <C.Toolbar left={this.data.board.name} right={memberButton}/>
        {sideRight}
        <div className="container">
          <h5>{TAPi18n.__('yourNotes')}</h5>
          <div className="note-list" ref="dragContainer">
            {this.renderNotes()}
          </div>
        </div>
      </div>
    )
  },

  componentDidMount() {
    let container = React.findDOMNode(this.refs.dragContainer)

    reactDragula([container], {
      isContainer(el) {
        return false;
      }
    })
  }
})
