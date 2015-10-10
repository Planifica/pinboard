C.Toolbar = React.createClass({
    render () {
        return (
            <div className="toolbar">

                <div className="left">
                    {this.props.left}
                </div>

                <div className="center">
                    {this.props.center}
                </div>

                <div className="right">
                    {this.props.right}
                </div>

            </div>
        )
    }
})
