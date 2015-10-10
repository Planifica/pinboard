C.MainHeader = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            currentUser: Meteor.user()
        }
    },
    handleLogout() {
        Meteor.logout();
    },
    render() {
        let loginButton;
        let { currentUser } = this.data;

        if (currentUser) {
            loginButton = (
              <a href="#" onClick={this.handleLogout}>Logout</a>
            )
        } else {
            loginButton = (
              <a href="/login">Login</a>
            )
        }

        logo = (
            <div>Logo</div>
        )

        return (
            <header className="public">
                <C.Toolbar left={logo} right={loginButton}/>
            </header>
        )
    }
});
