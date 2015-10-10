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
  handleChange(event) {
    this.setState({ memberName: event.target.value })
  },
  render() {
    let members = this.state.members
    let self = this
    let memberList = (
      <ul>
      {members.map(function(result) {
        return <li id={result.username} onClick={self.addMember}>{result.username}</li>
      })}
      </ul>
    )
    console.log(this.props)
    return (
      <header className="private">
        <div className="search-form">
            <input
            value={this.state.memberName}
            onChange={this.handleChange}
            className="search-member-input"
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
