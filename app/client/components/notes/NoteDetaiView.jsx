C.NoteDetailView = React.createClass({
  PropTypes: {
    note: React.PropTypes.object,
    hideSideBar: React.PropTypes.func
  },
  render() {
    const toolbarButtons = (
      <div>
        <C.IconButton
          icon="ion-ios-trash-outline"
          toolbarLeftClassName="toolbar-right-icon"
          onClick={this.renderSearchHeader} />
        <C.IconButton
          icon="ion-ios-close-empty"
          className="toolbar-right-icon"
          onClick={this.props.hideSideBar} />
      </div>
    )
    const noteContent = (
      <div>
        <C.Note note={this.props.note}/>
        <C.NoteComment noteId={this.props.note._id}/>
        <C.ShowComment noteId={this.props.note._id}/>
      </div>
    )
    return (
        <C.SideRight
          className='menu-right note-detail-view'
          content={noteContent}
          toolbarRight={toolbarButtons}/>
    )
  }
})
