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
  renderSearchHeader() {
    ReactLayout.render(C.MainLayout, {
      header: <C.SearchHeader />,
      content: <C.Boards />,
      footer: <C.MainFooter />
    })
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
        <div className="brand-logo">
          <img src="/full-white.png"></img>
        </div>
    )
    let goToBoards = function() {
      FlowRouter.go('/boards')
    }
    let hamburger = (
      <C.IconButton icon="ion-ios-book-outline" onClick={goToBoards}/>
    )
    let actions = (
      <div>
        { /* <C.IconButton icon="ion-ios-search" onClick={this.renderSearchHeader}/>*/ }
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
