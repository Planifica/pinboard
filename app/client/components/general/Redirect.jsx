C.Redirect = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
        currentUser: Meteor.user()
    }
  },
  render() {
    if (this.data.currentUser !== null) {
      FlowRouter.go('Boards')
    }
    return false
  }
})
