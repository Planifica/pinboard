C.BoardThumbnail = React.createClass({
  propTypes: {
    board: React.PropTypes.object.isRequired
  },
  render() {
    return (
      <div className="board-thumbnail">
        <div className="title">
          {this.props.board.name}
        </div>
      </div>
    )
  }
})
