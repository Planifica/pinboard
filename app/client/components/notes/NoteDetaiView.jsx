C.NoteDetailView = React.createClass({
  PropTypes: {
    note: React.PropTypes.object
  },
  render() {
    const toolbarButtons = (
      <div>
        <C.IconButton
          icon="ion-ios-trash-outline"
          toolbarLeftClassName="toolbar-right-icon"
          onClick={this.renderSearchHeader} />
        <C.IconButton
          icon="ion-android-create"
          toolbarLeftClassName="toolbar-right-icon"
          onClick={this.renderSearchHeader} />
        <C.IconButton
          icon="ion-ios-close-empty"
          className="toolbar-right-icon"
          onClick={this.hide} />
      </div>
    )
    const noteContent = (
      <C.Note note={this.props.note}/>
    )
    return (
        <C.SideRight
          className='note-detail-view'
          content={noteContent}
          toolbarRight={toolbarButtons}/>
    )
  }
})
