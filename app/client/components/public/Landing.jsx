C.Landing = React.createClass({
  landingButtonOnClick: function (event){
    FlowRouter.go("/register");
  },
    render() {
        return (
            <div>
                <h2>{TAPi18n.__('title')}</h2>
                <h4>{TAPi18n.__('subtitle')}</h4>
                <button onClick={ this.landingButtonOnClick } className="landing-button">{TAPi18n.__('signUpItsFree')}</button>
            </div>
        )
    }
});
