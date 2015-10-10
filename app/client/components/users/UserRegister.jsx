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
            <div className="container">
                <div className="row">
                    <div className="twelve columns">
                        <h1>Register</h1>

                        <form onSubmit={this.onSubmit}>
                            <C.AuthErrors errors={this.state.errors} />
                            <C.FormInput hasError={!!this.state.errors.email} name="Email" type="text" label="Email" />
                            <C.FormInput hasError={!!this.state.errors.fullname} name="Fullname" type="text" label="Fullname" />
                            <C.FormInput hasError={!!this.state.errors.password} name="Password" type="password" label="Password" />
                            <input type="submit" className="btn btn-default"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
});
