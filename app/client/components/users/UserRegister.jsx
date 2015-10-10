C.UserRegister = React.createClass({
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
        event.preventDefault();

        var email = $(event.target).find("[name=email]").val();
        var fullname = $(event.target).find("[name=fullname]").val();
        var password = $(event.target).find("[name=password]").val();

        var errors = {};

        if (!email) {
            errors.email = "Email required"
        }

        if (!fullname) {
            errors.fullname = "Fullname required"
        }

        if (!password) {
            errors.password = "Password required"
        }

        this.setState({
            errors: errors
        });

        if (! _.isEmpty(errors)) {
            return;
        }

        let userOptions = {
          username: fullname.replace(/ /g,''),
          email: email,
          password: password
        }

        Accounts.createUser(userOptions, (err) => {
            if (err) {
                this.setState({
                    errors: {'none': err.reason}
                });

                return;
            } else {
                FlowRouter.go('Home');
            }
        });
    },
    render() {
        return (
          <div className="user-login">
              <div className="user-login-container">
                  <h1>Register</h1>
                  <form onSubmit={this.onSubmit} className="u-full-width row">
                      <C.AuthErrors errors={this.state.errors} />
                      <C.FormInput hasError={!!this.state.errors.email} name="Email" type="text" label="Email" classExtendInput="u-full-width"/>
                      <C.FormInput hasError={!!this.state.errors.fullname} name="Fullname" type="text" label="Fullname" classExtendInput="u-full-width"/>
                      <C.FormInput hasError={!!this.state.errors.password} name="Password" type="password" label="Password" classExtendInput="u-full-width"/>
                      <button type="submit" className="landing-button u-full-width">{TAPi18n.__('signUp')}</button>
                  </form>
              </div>
          </div>
        )
    }
});
