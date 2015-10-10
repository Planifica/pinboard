C.MainHeader = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      currentUser: Meteor.user()
    }
  },
  handleLogout() {
    Meteor.logout()
  },
  handleLogin() {
    FlowRouter.go('Login')
  },
  render() {
    let { currentUser } = this.data
    let loginButton
    if (currentUser) {
      loginButton = (
        <button onClick={this.handleLogout}>Logout</button>
      )
    } else {
      loginButton = (
        <button onClick={this.handleLogin}>Login</button>
      )
    }

    let logo = (
        <div>Logo</div>
    )
    let hamburger = (
        <div></div>
    )
    let actions = (
      <div>
        <C.IconButton icon="ion-ios-search"/>
        {loginButton}
      </div>
    )

    return (
        <header className="private">
            <C.Toolbar left={hamburger} center={logo} right={actions}/>
        </header>
    )
  }
})
