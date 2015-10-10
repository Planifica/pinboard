C.Boards = React.createClass({

  getBoards() {
    return [
      { _id: 1, title: 'This is task 1' },
      { _id: 2, title: 'This is task 2' },
      { _id: 3, title: 'This is task 3' },
      { _id: 4, title: 'This is task 3' },
      { _id: 5, title: 'This is task 3' },
      { _id: 6, title: 'This is task 3' },
      { _id: 7, title: 'This is task 3' },
      { _id: 8, title: 'This is task 3' },
      { _id: 9, title: 'This is task 3' },
      { _id: 10, title: 'This is task 3' },
      { _id: 11, title: 'This is task 3' },
      { _id: 12, title: 'This is task 3' },
      { _id: 13, title: 'This is task 3' },
      { _id: 14, title: 'This is task 3' }
    ]
  },

  renderBoards() {
    return this.getBoards().map((board) => {
      return <C.BoardThumbnail key={board._id} board={board} />
    })
  },

  render() {
    return (
      <div className="container">
        <h5>{TAPi18n.__('yourBoards')}</h5>
        <div className="board-list">
            {this.renderBoards()}
        </div>
      </div>
    )
  }
})
