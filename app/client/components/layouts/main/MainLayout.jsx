C.MainLayout = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
        currentUser: Meteor.user()
    }
  },
    render() {
      let content = <C.UserLogin />
      if (!this.data.currentUser) {
        content = this.props.content
      }
      return (
          <div>
              {this.props.header}

              {content}

              {this.props.footer}
          </div>
      )
    }
})
