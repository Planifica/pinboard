C.Members = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let boardId = FlowRouter.getParam('boardId')
    let board = Boards.findOne({ _id: boardId })
    let handle = Meteor.subscribe('users', board.members)
    return {
      userLoading: !handle.ready(),
      board,
      members: Meteor.users.find().fetch()
    }
  },
  removeMember(user) {
    console.log("remove");
    let userId = user._id
    Meteor.call('removeMember', userId, this.data.boardId, () => {
    })
  },
  getInitialState: function() {
    return {
      searchMember: false
    }
  },
  toggleSearchMember() {
    if (this.state.searchMember === false) {
      this.setState({ searchMember: true })
    } else {
      this.setState({ searchMember: false })
    }

  },
  render() {
    // LOADING
    if (this.data.userLoading) {
      return false
    }
    let memberSearch
    if (this.state.searchMember === false) {
      memberSearch = (
        <button type="submit" className="landing-button u-full-width" onClick={ this.toggleSearchMember }>
        {TAPi18n.__('addMember')}
        </button>
      )
    } else {
      memberSearch = (<C.MemberSearch focusOut={ this.toggleSearchMember }/>)
    }
    let users = this.data.members
    let members = (
      <div>
        {users.map(function(result) {
          return <C.UserItem user={result} actionItem=<C.IconButton
          icon='ion-ios-close-empty'
          onClick={this.removeMember} /> />
        })}
      </div>
    )
    return (
      <div className="container">
        {memberSearch}
        {members}
      </div>
    )
  }
})
