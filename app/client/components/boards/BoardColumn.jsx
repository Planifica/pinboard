C.BoardColumn = React.createClass({
  renderNotes() {
    return this.props.notes.map((note) => {
      if (note.virtual) {
        return <C.NotePlaceholder note={note} addNote={this.props.addNote} />
      }

      return <C.NoteThumbnail key={note._id} note={note} showDetailView={this.props.showDetailView}/>
    })
  },

  render() {
    let column = this.props.column
    let containerName = 'dragContainer' + column

    return (<div className="note-column" ref={containerName}>
        {this.renderNotes()}
      </div>
    )
  },

  componentDidMount() {
    let container = React.findDOMNode(this)
    let drake = this.props.drake

    drake.containers.push(container)

    drake.on('drop', (el, target, source, sibling) => {
      console.log(el.dataset.x, sibling.dataset.x)
    })
  }
})
