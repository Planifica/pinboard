C.BoardThumbnail = React.createClass({
  propTypes: {
    board: React.PropTypes.object.isRequired
  },
  loadBoard() {
    FlowRouter.go('/boards/' + this.props.board._id)
  },
  render() {
    return (
      <div className="board-thumbnail" onClick={this.loadBoard}>
        <div className="title">
          {this.props.board.name}
        </div>
      </div>
    )
  }
})
