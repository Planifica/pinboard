C.Boards = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {

    Meteor.subscribe('boards')
    Meteor.subscribe('tags', '123')

    return {
      tasks: Boards.find({}).fetch(),
      tags: Tags.find().fetch()
    }
  },

  renderBoards() {
    return this.data.tasks.map((board) => {
      return <C.BoardThumbnail key={board._id} board={board} />
    })
  },

  render() {
    return (
      <div className="container board-list-container">
        <h5>{TAPi18n.__('yourBoards')}</h5>
        <C.TagLine tags={this.data.tags}/>
        <div className="board-list">
            <C.BoardCreationThumbnail/>
            {this.renderBoards()}
        </div>
      </div>
    )
  }
})
