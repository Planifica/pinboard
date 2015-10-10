C.BoardThumbnail = React.createClass({
  propTypes: {
    board: React.PropTypes.object.isRequired
  },
  render() {
    return (
      <a href={this.prop.board._id}>
        <div className="board-thumbnail">
          <div className="title">
            {this.props.board.name}
          </div>
        </div>
      </a>
    )
  }
})
