C.Board = React.createClass({

  getNotes() {
    return [
      { _id: 1, title: 'This is task 1' },
      { _id: 2, title: 'This is task 2' },
      { _id: 3, title: 'This is task 3' },
      { _id: 4, title: 'This is task 4' },
      { _id: 5, title: 'This is task 5' },
      { _id: 6, title: 'This is task 6' },
      { _id: 7, title: 'This is task 7' },
      { _id: 8, title: 'This is task 8' },
      { _id: 9, title: 'This is task 9' }
    ]
  },

  renderNotes() {
    return this.getNotes().map((note) => {
      return <C.NoteThumbnail key={note._id} note={note} />
    })
  },

  render() {
    return (
      <div className="container">
        <h5>{TAPi18n.__('yourNotes')}</h5>
        <div className="note-list" ref="dragContainer">
          {this.renderNotes()}
        </div>
      </div>
    )
  },

  componentDidMount() {
    let container = React.findDOMNode(this.refs.dragContainer)

    dragula([container])
  }
})
