C.MemberSearch = React.createClass({
  mixins: [],
  getInitialState() {
    return {
      members: [],
      memberName: ''
    }
  },
  /* Fetches tags from the server */
  searchMembers(event) {
    let name = $(event.target).val()
    Meteor.call('searchMembers', name, (err, res) => {
      this.setState({ members: res })
    })
  },
  addMember(user) {
    let userId = user._id
    let boardId = FlowRouter.getParam('boardId')
    Meteor.call('addMember', userId, boardId, () => {
    })
  },
  handleChange(event) {
    this.setState({ memberName: event.target.value })
  },
  render() {
    let members = this.state.members
    let memberList = (
      <ul className='user-items'>
        {members.map(function(result) {
          return <li id={result.username}>
          <C.UserItem user={result}
          handlePrimaryClick={this.addMember}/>
          </li>
        })}
      </ul>
    )
    return (
      <header className="private">
        <div className="search-form">
            <input
            value={this.state.memberName}
            onChange={this.handleChange}
            className="member-search"
            type="text"
            placeholder={TAPi18n.__('searchMember')}
            onKeyUp={this.searchMembers}
            autoComplete="off"
            onfocusout={this.props.focusOut}/>
            {memberList}
        </div>
      </header>
    )
  }
})
