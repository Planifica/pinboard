C.Boards = React.createClass({

  getBoards() {
    return [
      { _id: 1, title: 'This is task 1' },
      { _id: 2, title: 'This is task 2' },
      { _id: 3, title: 'This is task 3' }
    ]
  },

  renderBoards() {
    return this.getBoards().map((board) => {
      return <C.BoardThumbnail key={board._id} board={board} />
    })
  },

  render() {
    return (
      <div>
        <h4>{TAPi18n.__('yourBoards')}</h4>
        <div className="board-list">
            {this.renderBoards()}
        </div>
      </div>
    )
  }
})
