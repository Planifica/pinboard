C.Note = React.createClass({
  PropTypes: {
    note: React.PropTypes.object
  },
  mixins: [ReactMeteorData],
  getMeteorData () {
    this.note = Notes.findOne({
      _id: this.props.note._id
    })
    Meteor.subscribe('tags', FlowRouter.getParam('boardId'))
    return {
      tags: Tags.find({
        _id: {
          $in: this.note ? (this.note.tagIds || []) : []
        }
      }).fetch()
    }
  },
  getInitialState() {
    return {
      name: this.props.note.name || '',
      text: this.props.note.text || '',
      tagIds: this.props.note.tagIds || []
    }
  },
  onKeyUp(evt) {
    let node = $(evt.target)
    let value = node.val()
    let boardId = FlowRouter.getParam('boardId')
    if (!this.note) {
      if (node.is('input')) {
        this.props.note._id = Notes.insert({
          [node.attr('name')]: value,
          boardId: boardId,
          ownerId: Meteor.userId(),
          position: {
            x: this.props.note.position.x,
            y: this.props.note.position.y
          }
        })
        this.setState(Notes.findOne({
          _id: this.props.note._id
        }))
      }
      return
    }
    Notes.update({
      _id: this.props.note._id
    }, {
      $set: {
        [node.attr('name')]: value
      }
    })
  },
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  },
  newTagWithName(tagName) {
    // create new tag
    const tagId = Tags.insert({
      name: tagName,
      boardId: FlowRouter.getParam('boardId')
    })
    this.addExistingTag(tagId)
  },
  addExistingTag(tagId) {
    // add tag to note
    Notes.update({
      _id: this.props.note._id
    }, {
      $push: {
        tagIds: tagId
      }
    })
  },
  removeTag(tagId) {
    // remove tag from note
    Notes.update({
      _id: this.props.note._id
    }, {
      $pull: {
        tagIds: tagId
      }
    })
  },
  render () {
    return (
      <div className="note">
        <input type="text"
          name="name"
          onChange={this.onChange}
          value={this.state.name}
          onKeyUp={this.onKeyUp}
          placeholder="Add a title here"/>
        <C.TagLine
          tags={this.data.tags}
          tagNotFoundWithName={this.newTagWithName}
          handleRemove={this.removeTag}
          handleSelect={this.addExistingTag}/>
        <textarea type="text" name="text" onChange={this.onChange} value={this.state.text}
          onKeyUp={this.onKeyUp}
          placeholder="And a description here"></textarea>
      </div>
    )
  }
})
