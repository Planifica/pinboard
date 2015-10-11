C.MarkdownNote = React.createClass({
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
      if (node.is('textarea')) {
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
  rawMarkup: function() {
    if (this.state.text) {
      return { __html: marked(this.state.text, { sanitize: true }) }
    }
  },
  render: function() {
    return (
      <div className="MarkdownEditor">
        <h3>Input</h3>
        <textarea
          onKeyUp={this.onKeyUp}
          onChange={this.onChange}
          name="text"
          ref="textarea"
          defaultValue={this.state.text} />
        <h3>Output</h3>
        <div
          className="content"
          dangerouslySetInnerHTML={this.rawMarkup()}
        />
      </div>
    )
  }
})
