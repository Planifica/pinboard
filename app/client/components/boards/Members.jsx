C.Members = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
    }
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
    return (
      <div className="container">
        {memberSearch}
      </div>
    )
  }
})
