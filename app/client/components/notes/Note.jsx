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
    let boardId = FlowRouter.getParam('boardId')
    if (!this.data.note._id) {
      if (node.is('input')) {
        Notes.insert({
          name: value,
          boardId: boardId,
          ownerId: Meteor.userId(),
          position: {
            x: this.data.note.position.x,
            y: this.data.note.position.y
          }
        }, (err, id) => {
          this.data.note._id = id
        })
      } else if (node.is('textarea')) {
        Notes.insert({
          text: value
        })
      }
    }
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
        <input type="text" name="title" onChange={this.onChange} value={this.data.note.name}
          onKeyUp={this.onKeyUp}/>
        <textarea type="text" name="text" onChange={this.onChange} value={this.data.note.text}
          onKeyUp={this.onKeyUp}></textarea>
      </div>
    )
  }
})
