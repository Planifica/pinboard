C.MembersView = React.createClass({
  PropTypes: {
    hideSideBar: React.PropTypes.func
  },
  render () {
    const content = (
      <C.Members/>
    )
    const toolbar = (
      <div>
        <C.IconButton
          icon="ion-ios-close-empty"
          className="toolbar-right-icon"
          onClick={this.props.hideSideBar} />
      </div>
    )
    return (
      <C.SideRight className='menu-right'
      content={content}
      toolbarRight={toolbar}/>
    )
  }
})
