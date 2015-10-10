C.UserLogin = React.createClass({
    mixins: [],
    PropTypes: {

    },
    getInitialState() {
      return {
          errors: {}
      }
    },
    getMeteorData() {
      return {

      }
    },
    onSubmit(event) {
      event.preventDefault()

      let email = $(event.target).find('[name=email]').val()
      let password = $(event.target).find('[name=password]').val()

      let errors = {}

      if (!email) {
        errors.email = 'Email required'
      }

      if (!password) {
        errors.password = 'Password required'
      }

      this.setState({
          errors: errors
      })

      if (!_.isEmpty(errors)) {
        return
      }

      Meteor.loginWithPassword(email, password, (err) => {
        if (err) {
          this.setState({
              errors: { none: err.reason }
          })
        } else {
          FlowRouter.go('Home')
        }
      })
    },
    render() {
      return (
            <div className="user-login">
                <div className="user-login-container">
                    <h1>Login</h1>
                    <form onSubmit={this.onSubmit} className="u-full-width row">
                        <C.AuthErrors errors={this.state.errors} />
                        <C.FormInput hasError={!!this.state.errors.email}
                        name="Email" type="text" label="Email" classExtendInput="u-full-width" />
                        <C.FormInput hasError={!!this.state.errors.password}
                        name="Password" type="password" label="Password" classExtendInput="u-full-width"/>
                        <button type="submit" className="landing-button u-full-width">{TAPi18n.__('signIn')}</button>
                        <a href="/register">{TAPi18n.__('signUp')}</a>
                    </form>
                </div>
            </div>
        )
    }
})
