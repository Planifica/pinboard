C.PublicLayout = React.createClass({
    render() {
        return (
            <div>
                {this.props.header}

                <div className="landing">
                    {this.props.content}
                </div>

                {this.props.footer}
            </div>
        )
    }
});
