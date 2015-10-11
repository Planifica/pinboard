C.NoteDetailView = React.createClass({
  getInitialState() {
    return {
      markdown: false,
      buttonClass: 'off'
    }
  },
  PropTypes: {
    note: React.PropTypes.object,
    hideSideBar: React.PropTypes.func
  },
  setMarkdown() {
    if (this.state.markdown === false) {
      this.setState({ markdown: true })
      this.setState({ buttonClass: 'on' })
    } else {
      this.setState({ markdown: false })
      this.setState({ buttonClass: 'off' })
    }
  },
  removeNote() {
    Notes.remove({ _id: this.props.note._id })
    Meteor.call('removeComment', this.props.note._id)
    this.props.hideSideBar()
  },
  render() {
    let buttonClass

    const toolbarButtonsLeft = (
      <div>
        <button className
          onClick={this.setMarkdown} >
          <i className="ion-ios-arrow-left"/>
          <i className="ion-ios-arrow-right"/>
          </button>
      </div>
    )
    const toolbarButtons = (
      <div>
        <C.IconButton
          icon="ion-ios-trash-outline"
          toolbarLeftClassName="toolbar-right-icon"
          onClick={this.removeNote} />
        <C.IconButton
          icon="ion-ios-close-empty"
          className="toolbar-right-icon"
          onClick={this.props.hideSideBar} />
      </div>
    )
    let editor
    if (this.state.markdown === true) {
      editor = (<C.MarkdownNote note={this.props.note}/>)
    } else {
      editor = (<C.Note note={this.props.note}/>)
    }
    const noteContent = (
      <div>
        {editor}
        <C.NoteComment noteId={this.props.note._id}/>
        <C.ShowComment noteId={this.props.note._id}/>
      </div>
    )
    return (
        <C.SideRight
          className='menu-right note-detail-view'
          content={noteContent}
          toolbarLeft={toolbarButtonsLeft}
          toolbarRight={toolbarButtons}/>
    )
  }
})
