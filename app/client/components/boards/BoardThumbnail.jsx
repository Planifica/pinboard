C.BoardThumbnail = React.createClass({
  render() {
    return (
      <div className="board-thumbnail">
        <div className="title">
          {this.props.board.title}
        </div>
      </div>
    )
  }
})
