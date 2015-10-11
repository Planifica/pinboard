C.PublicHeader = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            currentUser: Meteor.user()
        }
    },
    handleLogout() {
        Meteor.logout();
    },
    handleLogin() {
        FlowRouter.go("Login");
    },
    render() {
        let loginButton;
        let { currentUser } = this.data;

        if (currentUser) {
            loginButton = (
              <button onClick={this.handleLogout}>Logout</button>
            )
        } else {
            loginButton = (
              <button onClick={this.handleLogin}>Login</button>
            )
        }

        logo = (
            <div className="brand-logo">
              <img src="/full4.png"></img>
            </div>
        )

        return (
            <header className="public">
                <C.Redirect />
                <C.Toolbar left={logo} right={loginButton}/>
            </header>
        )
    }
});
