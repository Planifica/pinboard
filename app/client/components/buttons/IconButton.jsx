C.IconButton = React.createClass({
    render () {
        return (
            <button class="button">
                <i className={this.props.icon}></i>
            </button>
        )
    }
})
