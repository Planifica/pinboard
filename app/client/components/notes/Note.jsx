C.Note = React.createClass({
  PropTypes: {
    note: React.PropTypes.object
  },
  mixins: [ReactMeteorData],
  getMeteorData () {
    return {
      tags: Tags.find().fetch(),
      // note: Notes.findOne({
      //   _id: this.props.note._id
      // })
      note: this.props.note
    }
  },
  onKeyUp(evt) {
    let node = $(evt.target)
    let value = node.val()
    Notes.update({
      _id: this.data.note._id
    }, {
      $set: {
        [node.attr('name')]: value
      }
    })
  },
  render () {
    // <C.TagLine tags={this.data.tags}/>
    return (
      <div className="note">
        <input type="text" name="title" value={this.data.note.title}
          onKeyUp={this.onKeyUp}/>
        <textarea type="text" name="text" value={this.data.note.text}
          onKeyUp={this.onKeyUp}></textarea>
      </div>
    )
  }
})
