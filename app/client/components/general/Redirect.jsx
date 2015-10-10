C.Redirect = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
        currentUser: Meteor.user()
    }
  },
  render() {
    if (!this.data.currentUser) {
      FlowRouter.go('Boards')
    }
    return false
  }
})
