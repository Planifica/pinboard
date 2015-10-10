C.Landing = React.createClass({
    render() {
        return (
            <div className="landing">
                <h2>{TAPi18n.__('title')}</h2>
                <h4>{TAPi18n.__('subtitle')}</h4>
                <button className="landing-button">{TAPi18n.__('signUpItsFree')}</button>
            </div>
        )
    }
});
