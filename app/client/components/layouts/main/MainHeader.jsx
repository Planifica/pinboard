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

        logo = (
            <div>Logo</div>
        )
        hamburger = (
            <div></div>
        )
        actions = (
            <C.IconButton icon="ion-ios-search"/>
        )

        return (
            <header className="private">
                <C.Toolbar left={hamburger} center={logo} right={actions}/>
            </header>
        )
    }
});
