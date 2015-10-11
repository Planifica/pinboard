C.Note = React.createClass({
  PropTypes: {
    note: React.PropTypes.object
  },
  mixins: [ReactMeteorData],
  getMeteorData () {
    this.note = Notes.findOne({
      _id: this.props.note._id
    })
    return {
      tags: Tags.find().fetch()
    }
  },
  getInitialState() {
    return {
      name: this.props.note.name || '',
      text: this.props.note.text || ''
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
  render () {
    // <C.TagLine tags={this.data.tags}/>
    return (
      <div className="note">
        <input type="text" name="name" onChange={this.onChange} value={this.state.name}
          onKeyUp={this.onKeyUp}/>
        <textarea type="text" name="text" onChange={this.onChange} value={this.state.text}
          onKeyUp={this.onKeyUp}></textarea>
      </div>
    )
  }
})
